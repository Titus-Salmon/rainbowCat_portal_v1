//begin edit DB////////////////////////////////////////////////////////////////////
const EditDBbtn = document.getElementById("editDB");

EditDBbtn.addEventListener('click', function () {
    console.log('editDB button clicked')
    let ResTblBdy = document.getElementById('resTblBdy');
    let rows = ResTblBdy.getElementsByTagName('tr');
    if (rows.length > 0 && localStorage.length > 0) {
        console.log('rows==>', rows)
        //console.log('rows.parentNode.rowIndex==>', rows.parentNode.rowIndex)
        console.log('rows.parentNode==>', rows.parentNode)
        let retrievedCellData = JSON.parse(localStorage.getItem("clickedRowData"));

        console.log('retrievedCellData~~~>', retrievedCellData)
        window.location = 'http://rainbow--cat.herokuapp.com/editEntryAndrea'
        // window.location = 'http://localhost:3000/editEntryAndrea'
    }
})
//end edit DB////////////////////////////////////////////////////////////////////