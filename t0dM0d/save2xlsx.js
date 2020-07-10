const express = require('express')
const router = express.Router()
const xl = require('excel4node')
// const mysql = require('mysql')

// const connection = mysql.createConnection({
//   host: process.env.RB_HOST,
//   user: process.env.RB_USER,
//   password: process.env.RB_PW,
//   database: process.env.RB_DB,
//   multipleStatements: true //MUST HAVE to make more than 1 sql statement in a single query
// })

module.exports = {

  save2xlxs: router.post('/save2xlxs', (req, res, next) => {

    //NOTE++++++++>>> searchResults is the original array that holds the collection of SearchResults objects {columnName: cellValue}
    //HOWEVER, since the inherent order (from showSearchResults()) of these key:value pairs is not NECESSARILY the order we want to display them
    //in the excel file, and also since there MAY BE additional key:value pairs from searchResults that we DON'T want to display
    //we selectively reorder and/or remove the key:value pairs from searchResults to form the searchRes_selectiveReordering array
    //(WITHOUT modifying the original searchResults array).

    var searchRes_selectiveReordering = []

    for (let a = 0; a < searchResults.length; a++) {
      let reorderedResObj = {}
      reorderedResObj['P_K'] = searchResults[a]['P_K']
      reorderedResObj['Vendor'] = searchResults[a]['Vendor']
      reorderedResObj['EDI'] = searchResults[a]['EDI']
      reorderedResObj['IssDt'] = searchResults[a]['IssDt']
      reorderedResObj['Cmnts1'] = searchResults[a]['Cmnts1']
      reorderedResObj['Cmnts2'] = searchResults[a]['Cmnts2']
      reorderedResObj['Cmnts3'] = searchResults[a]['Cmnts3']
      reorderedResObj['Andr'] = searchResults[a]['Andr']
      reorderedResObj['Nathan'] = searchResults[a]['Nathan']
      reorderedResObj['vndemail'] = searchResults[a]['vndemail']
      reorderedResObj['wellMarg'] = searchResults[a]['wellMarg']
      reorderedResObj['ongDisco'] = searchResults[a]['ongDisco']
      reorderedResObj['EA_Num_divide'] = searchResults[a]['EA_Num_divide']
      reorderedResObj['CS_Num_divide'] = searchResults[a]['CS_Num_divide']
      reorderedResObj['special1'] = searchResults[a]['special1']
      reorderedResObj['disco_appld_to'] = searchResults[a]['disco_appld_to']
      reorderedResObj['sales_method'] = searchResults[a]['sales_method']
      reorderedResObj['min_order'] = searchResults[a]['min_order']
      reorderedResObj['edlp'] = searchResults[a]['edlp']
      reorderedResObj['order_qty'] = searchResults[a]['order_qty']
      reorderedResObj['rtlRvw'] = searchResults[a]['rtlRvw']
      reorderedResObj['rtlImw'] = searchResults[a]['rtlImw']
      reorderedResObj['tot_updtd'] = searchResults[a]['tot_updtd']

      searchRes_selectiveReordering.push(reorderedResObj)
    }

    console.log(`JSON.stringify(searchRes_selectiveReordering[0])==> ${JSON.stringify(searchRes_selectiveReordering[0])}`)


    // Create a new instance of a Workbook class
    var wb = new xl.Workbook()

    // Add Worksheets to the workbook
    var ws = wb.addWorksheet('Sheet 1')

    var bodyStyle = wb.createStyle({
      alignment: {
        wrapText: false,
        horizontal: 'center',
      },
      font: {
        color: 'black',
        size: 12,
      },
      // numberFormat: '$#,##0.00; ($#,##0.00); -',
    })

    var headerStyle = wb.createStyle({
      alignment: {
        wrapText: false,
        horizontal: 'center',
      },
      font: {
        color: 'black',
        size: 14,
        bold: true,

      },
      fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
        patternType: 'solid', //solid=t0d //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: 'black', // HTML style hex value. defaults to black
        fgColor: 'bright green' // HTML style hex value. defaults to black.
      },
    })

    var issDateHilite = wb.createStyle({
      fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
        patternType: 'solid', //solid=t0d //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: 'black', // HTML style hex value. defaults to black
        fgColor: 'orange' // HTML style hex value. defaults to black.
      },
    })

    var ediPriceHilite = wb.createStyle({
      fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
        patternType: 'solid', //solid=t0d //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: 'black', // HTML style hex value. defaults to black
        fgColor: '#93CDDD' // HTML style hex value. defaults to black.
      },
    })

    var sibBasePriceHilite = wb.createStyle({
      fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
        patternType: 'solid', //solid=t0d //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: 'black', // HTML style hex value. defaults to black
        fgColor: 'yellow' // HTML style hex value. defaults to black.
      },
    })

    var invalidOupName = wb.createStyle({
      fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implemented. Non-implemented option is 'gradient'
        patternType: 'solid', //solid=t0d //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: 'black', // HTML style hex value. defaults to black
        fgColor: 'red' // HTML style hex value. defaults to black.
      },
    })

    for (let i = 0; i < Object.keys(searchRes_selectiveReordering[0]).length; i++) {

      ws.cell(1, i + 1) //this targets "header" cells
        .string(`${Object.keys(searchRes_selectiveReordering[0])[i]}`)
        .style(headerStyle)

      for (let j = 0; j < searchRes_selectiveReordering.length; j++) {

        ws.cell(j + 2, i + 1)
          .string(`${Object.values(searchRes_selectiveReordering[j])[i]}`)
          .style(bodyStyle)
        if (Object.keys(searchRes_selectiveReordering[0])[i] == 'IssDt') {
          let cellDate = new Date(Object.values(searchRes_selectiveReordering[j])[i])
          let currentDate = new Date()
          if (Date.dateDiff('w', cellDate, currentDate) > 24) //if issue date of cat is more than 6 months old
            ws.cell(j + 2, i + 1).style(issDateHilite)
        }
        if (Object.keys(searchRes_selectiveReordering[0])[i] == 'ediPrice') {
          ws.cell(j + 2, i + 1).style(ediPriceHilite)
        }
        if (Object.keys(searchRes_selectiveReordering[0])[i] == 'sibBasePrice') {
          ws.cell(j + 2, i + 1).style(sibBasePriceHilite)
        }
        if (Object.values(searchRes_selectiveReordering[j])[i] == 'invalid oupName') {
          ws.cell(j + 2, i + 1).style(invalidOupName)
        }
      }
    }


    wb.write(`${process.cwd()}/public/csv/${req.body['xlsPost']}.xlxs`)

    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // //v//Automatically add note to rainbowcat table that Retail Review has been generated//////////////////////////////////////
    // let rtlRvwFilename = req.body['xlsPost']
    // //here we are doing some js magic to extract the "ediName" from the Rtl Rvw name we're saving (nejTableNameRtlRvwYYYMMDD):
    // // let regex1 = /(\d+)/g
    // let vendorNameSplit1 = rtlRvwFilename.split('nej')
    // let vendorNameSplit2 = vendorNameSplit1[1]
    // let vendorNameSplit3 = vendorNameSplit2.toLowerCase().split('rtlrvw')
    // let vendorName = vendorNameSplit3[0]
    // let ediVendorName = `EDI-${vendorName.toUpperCase()}`
    // console.log(`ediVendorName==> ${ediVendorName}`)

    // function updateRbCat() {
    //   connection.query(
    //     `UPDATE rainbowcat SET RtlRvw = '${req.body['xlsPost']}.xlxs' WHERE ediName = '${ediVendorName}'`,
    //     function (err, rows, fields) {
    //       if (err) throw err
    //       res.render('vw-MySqlTableHub', {
    //         title: `<<${process.cwd()}/public/csv/${req.body['xlsPost']}.xlxs SAVED, and rainbowcat updated>>`
    //       })
    //     })
    // }

    // updateRbCat()
    // //^//Automatically add note to rainbowcat table that Retail Review has been generated//////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  })
}