var oXHR = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : new ActiveXObject("Microsoft.XMLHTTP")

function reportStatus() {
  if (oXHR.readyState == 4 && oXHR.status == 200) {
    import_xml_table(this.responseXML)
  }
}

oXHR.onreadystatechange = reportStatus
oXHR.open("GET", "pontosTuristicos.xml", true)
oXHR.send()

function import_xml_table(xml) {
  var pontosTuristicos_div = document.getElementById("pontosTuristicos")
  var pontoTuristico_list = xml.getElementsByTagName("pontoTuristico")

  var table = document.createElement("table")

  var tr_header = document.createElement("tr")
  var th_col_1 = document.createElement("th")
  var th_col_2 = document.createElement("th")
  var th_col_3 = document.createElement("th")

  // <nome>
  // <descricao>
  // <localizacao>

  th_col_1.innerHTML = "Nome"
  th_col_2.innerHTML = "Descrição"
  th_col_3.innerHTML = "Localização"

  tr_header.appendChild(th_col_1)
  tr_header.appendChild(th_col_2)
  tr_header.appendChild(th_col_3)

  pontosTuristicos_div.appendChild(table)
  table.appendChild(tr_header)

  for (var i = 0; i < pontoTuristico_list.length; i++) {
    var tr = document.createElement("tr")

    var td_col_1 = document.createElement("td")
    var td_col_2 = document.createElement("td")
    var td_col_3 = document.createElement("td")

    td_col_1.innerHTML =
      pontoTuristico_list[i].getElementsByTagName(
        "nome"
      )[0].childNodes[0].nodeValue
    td_col_2.innerHTML =
      pontoTuristico_list[i].getElementsByTagName(
        "descricao"
      )[0].childNodes[0].nodeValue

    var localizacao =
      pontoTuristico_list[i].getElementsByTagName("localizacao")[0]
        .childNodes[0].nodeValue
    var a_localizacao = document.createElement("a")
    a_localizacao.href = localizacao
    a_localizacao.target = "_blank"
    a_localizacao.innerHTML = "Ver Localização"
    td_col_3.appendChild(a_localizacao)

    tr.appendChild(td_col_1)
    tr.appendChild(td_col_2)
    tr.appendChild(td_col_3)

    table.appendChild(tr)
  }
}
