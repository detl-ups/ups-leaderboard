import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Chart, ChartOptions } from "chart.js"
import { NgChartsModule } from "ng2-charts"

import { FileUploadModule } from "primeng/fileupload"
import { HttpClientModule } from "@angular/common/http"

import * as FileSaver from "file-saver"
import ChartDataLabels from "chartjs-plugin-datalabels"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { ApiService } from "./api.service"

interface Label {
  name: string
  position: number
}

interface Student {
  name: string
  position: number
  nota: number
  otrasNotas: any[]
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [ApiService],
})
export class AppComponent {
  fields = []
  selectedFieldsName: any = {}
  courses = []
  file: any
  codigoCurso = ""
  minVal: number = 20
  preferVal: number = 20

  data: any
  options: any
  showChart = false
  showList = false
  showUpload = false

  draggedProduct: any

  fieldPieChart: any[] = []
  fieldsScore: any[] = []
  fieldsName: any[] = []
  availableProducts: any[] = []

  percents = [50, 50]
  title = "ups-score"
  labelNotas = []
  colsExport = []
  plainDataToExport = []

  optionGrafico = [
    {
      label: "Pie",
      value: "pie",
    },
    {
      label: "Line",
      value: "line",
    },
  ]
  graficoSeleccionado = "pie"

  chartType = "doughnut"

  dataDonut = {}
  dataLine = {}

  constructor(private apiService: ApiService) {
    Chart.register(ChartDataLabels)

    this.data = {
      labels: ["Mayor de 40", "Menor de 40"],
      datasets: [
        {
          data: this.percents,
        },
      ],
    }

    this.options = {
      plugins: {
        title: {
          display: false,
          text: "Curso",
          fontSize: 16,
        },
        legend: {
          position: "bottom",
          display: false,
        },
        datalabels: {
          font: {
            weight: "bold",
            size: 16,
          },
        },
      },
      scales: {
        x: {
          display: false,
          title: {
            display: false,
            text: "Notas",
          },
        },
        y: {
          display: false,
          title: {
            display: false,
            text: "Notas",
          },
        },
      },
    }
  }

  generarCurso() {
    this.apiService.get("score").then((data) => {
      this.codigoCurso = data.course
    })
  }

  leeArchivos(numarchivo: number, file: any) {
    var fr = new FileReader()
    this.file = file
    fr.readAsText(file)

    fr.onload = (e: any) => {
      var text = e.target.result
      var rows = text.split("\n")

      var labels = rows[0].split(",")

      for (let index = 0; index < labels.length; index++) {
        const element = labels[index].replaceAll('"', "").trim()
        this.fields = [...this.fields, { name: element, position: index }]
        this.availableProducts = [
          ...this.availableProducts,
          { name: element, position: index },
        ]
      }

      this.showList = true
      console.log(this.fields)
    }
  }

  onFileSelect(event) {
    var files = event.files!
    var len = files.length
    for (var b = 0; b < len; b++) {
      this.leeArchivos(b, files[b])
    }
  }

  getDataset(position: number, callback) {
    var students: Student[] = []
    var fr = new FileReader()
    fr.readAsText(this.file)

    fr.onload = (e: any) => {
      var text = e.target.result
      var rows = text.split("\n")
      for (let index = 1; index < rows.length; index++) {
        console.log(rows[index] + " element at index " + index)
        const element = rows[index].split(",")
        if (element.length > 1) {
          var name = this.getName(element)
          var otrasNotas = this.getOtrasNotas(element)
          students = [
            ...students,
            {
              name: name,
              position: index,
              nota: element[position],
              otrasNotas: otrasNotas,
            },
          ]
        }
      }
      callback(students)
    }
  }

  getName(element): string {
    var name = ""
    for (let nameIndex = 0; nameIndex < this.fieldsName.length; nameIndex++) {
      name = element[this.fieldsName[nameIndex].position] + " " + name
    }

    return name.replaceAll('"', "").trim()
  }

  getOtrasNotas(element): any {
    // var notas = []
    const data = {}

    for (let j = 0; j < this.fieldsScore.length; j++) {
      const position = this.fieldsScore[j].position
      const nota = element[this.fieldsScore[j].position]
      data[position] = nota
      // data["name"] = this.fieldsScore[j].name
      // data["position"] = this.fieldsScore[j].position
      // data["nota"] = nota
      // this.labelNotas = [...this.labelNotas, this.fieldsScore[j].name]

      // notas = [...notas, data]
    }
    return data
  }

  loadLabels() {
    for (let j = 0; j < this.fieldsScore.length; j++) {
      const field = this.fieldsScore[j].position
      const header = this.fieldsScore[j].name
      this.labelNotas = [...this.labelNotas, { header: header, field: field }]
    }
  }

  generar() {
    if (this.fieldPieChart.length > 0) {
      this.getDataset(this.fieldPieChart[0].position, (course) => {
        course = course.sort((a, b) =>
          parseInt(a.nota) > parseInt(b.nota) ? 1 : -1
        )
        this.loadLabels()
        console.log(course)
        const min = []
        const reg = []
        const max = []

        const notas = []
        const nombres = []
        for (const iterator of course) {
          nombres.push(iterator.name)
          notas.push(iterator.nota)

          if (iterator.nota <= this.minVal) {
            min.push({
              name: iterator.name,
              nota: iterator.nota,
              position: iterator.position,
            })
          } else if (iterator.nota >= this.preferVal) {
            max.push({
              name: iterator.name,
              nota: iterator.nota,
              position: iterator.position,
            })
          } else {
            reg.push({
              name: iterator.name,
              nota: iterator.nota,
              position: iterator.position,
            })
          }
        }
        var mayor = (max.length * 100) / course.length
        var reprobados = (min.length * 100) / course.length
        var regulares = (reg.length * 100) / course.length

        this.percents = [mayor, regulares, reprobados]
        this.dataDonut = {
          labels: [
            "Mayor de " + this.preferVal,
            "Entre " + this.minVal + " y " + this.preferVal,
            "Menor de " + this.minVal,
          ],
          datasets: [
            {
              data: this.percents,
              backgroundColor: ["#42f569", "#36A2EB", "#FF6384"],
            },
          ],
        }

        this.dataLine = {
          labels: nombres,
          datasets: [
            {
              data: notas,
              tension: 0.1,
            },
          ],
        }

        // if (this.graficoSeleccionado == "pie") {
        //   this.data = this.dataDonut
        //   this.chartType = "doughnut"
        // } else {
        //   this.data = this.dataLine
        //   this.chartType = "line"

        // }

        this.onGraficoChange({})
        // reverse de arrray

        this.courses = course.reverse()
        this.showChart = true
        this.showUpload = true

        console.log(min)
        console.log(reg)
        console.log(max)
        this.creaExportCol()
      })
    }
  }

  subirDatos() {
    console.log("dataSubir " + this.courses)

    const data = {
      course: this.codigoCurso,
      students: this.plainDataToExport,
    }
    this.apiService.post(data, "score/").then((res) => {
      console.log(res)
      alert("Datos subidos correctamente")
    })
    // console.log(data)
  }
  exportPdf() {
    const doc = new jsPDF("portrait", "mm", "a4")

    doc.setFontSize(8)
    const exportColumns = {}

    autoTable(doc, {
      columns: this.colsExport,
      body: this.plainDataToExport,
      styles: {
        fontSize: 6,
        cellPadding: 0.5,
        valign: "middle",
      },
    })

    doc.save("Notas.pdf")
  }

  creaExportCol() {
    const colsHeaders = [
      { field: "name", header: "Alumno" },
      ...this.labelNotas,
      { field: "nota", header: "Total" },
    ]
    console.log(colsHeaders)
    const dataExport = []

    console.log(this.courses, " ordenado")
    for (let index = 0; index < this.courses.length; index++) {
      const student = this.courses[index]

      const data = {}
      data["rank"] = index + 1
      for (const col of colsHeaders) {
        if (col.field == "nota" || col.field == "name") {
          data[col.field] = student[col.field]
        } else {
          data[col.field] = student.otrasNotas[col.field]
        }
      }
      dataExport.push(data)
    }
    console.log(dataExport)

    this.colsExport = colsHeaders.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }))

    this.plainDataToExport = dataExport
  }

  onGraficoChange(event) {
    if (this.graficoSeleccionado == "pie") {
      this.data = this.dataDonut
      this.chartType = "doughnut"
      this.options = {
        plugins: {
          title: {
            display: false,
            text: "Curso",
            fontSize: 16,
          },
          legend: {
            position: "bottom",
            display: false,
          },
          datalabels: {
            formatter: function (value, context) {
              return value + "%"
            },
            font: {
              weight: "bold",
              size: 16,
            },
          },
        },
        scales: {
          x: {
            display: false,
            title: {
              display: false,
              text: "Notas",
            },
          },
          y: {
            display: false,
            title: {
              display: false,
              text: "Notas",
            },
          },
        },
      }
    } else {
      this.data = this.dataLine
      this.chartType = "line"
      this.options = {
        plugins: {
          title: {
            display: false,
            text: "Curso",
            fontSize: 16,
          },
          legend: {
            position: "bottom",
            display: false,
          },
          datalabels: {
            font: {
              size: 0,
            },
          },
        },
        scales: {
          x: {
            display: false,
            title: {
              display: false,
              text: "Notas",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Notas",
            },
          },
        },
      }
    }
  }
}
