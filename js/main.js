let data = [
    ["Sarah",3,5,5,2,1],
    ["Anita",2,2,3,3,4],
    ["Dina",5,4,5,4,5],
    ["Shabrina",3,1,3,5,4],
    ["Tifanny",1,3,1,3,2],
    ["Yudhistira",5,4,4,3,3],
    ["Aldi",4,2,3,4,1],
    ["Tira",3,1,5,2,2],
    ["Adjie",1,4,2,1,4],
    ["Ramadhani",1,2,3,2,5]
]

let kriteria = [
    ["Masa Kerja","20%",0.20],
    ["Penilaian Kerja","20%",0.20],
    ["Skill","25%",0.25],
    ["Tingkat Pendidikan","20%",0.20],
    ["Test(Ujian)","15",0.15]
]

$(document).ready(() =>{
    tampilData(data,'#data')
    tampilHasilHitung(prosesHitung(data),'#hasilPerhitungan')
    tampilRangking(perangkingan(prosesHitung(data),kriteria),'#hasilRangking')
})

// menampilkan data
function tampilData(data,id){
    let html;
    data.forEach(item => {
        html += '<tr>'+
                '<td class="bg-primary">'+item[0]+'</td>'+
                '<td class="table-success">'+item[1]+'</td>'+
                '<td class="table-success">'+item[2]+'</td>'+
                '<td class="table-success">'+item[3]+'</td>'+
                '<td class="table-success">'+item[4]+'</td>'+
                '<td class="table-success">'+item[5]+'</td>'+
                '</tr>'
    })
    $(id).html(html)
}

// menampilkan data hasil proses penghitungan
function tampilHasilHitung(data,id){
    let html
    data.forEach(item => {
        html += '<tr>'+
        '<td class="bg-primary">'+item[0]+'</td>'+
        '<td class="table-success">'+pendek(item[1],4)+'</td>'+
        '<td class="table-success">'+pendek(item[2],4)+'</td>'+
        '<td class="table-success">'+pendek(item[3],4)+'</td>'+
        '<td class="table-success">'+pendek(item[4],4)+'</td>'+
        '<td class="table-success">'+pendek(item[5],4)+'</td>'+
        '</tr>'
    })
    $(id).html(html)

}

// menampilkan hasil perengkingan
function tampilRangking(data,id){
    let html
    let no=1
    data.forEach(item => {
        html += '<tr>'+
        '<td class="bg-primary">'+item[1]+'</td>'+
        '<td class="table-success">'+pendek(item[0],4)+'</td>'+
        '</tr>'
        no++
    })
    $(id).html(html)
}

// mencari nilai maksimal tiap kategori dari masing masing alternative
function maxKategori(data){
    let hasil;
    let c1Max = new Array()
    let c2Max = new Array()
    let c3Max = new Array()
    let c4Max = new Array()
    let c5Max = new Array()
    for(let i =0; i < data.length;i++){
        c1Max.push(data[i][1]);
        c2Max.push(data[i][2]);
        c3Max.push(data[i][3]);
        c4Max.push(data[i][4]);
        c5Max.push(data[i][5]);
    }
    c1Max = Math.max.apply(null,c1Max)
    c2Max = Math.max.apply(null,c2Max)
    c3Max = Math.max.apply(null,c3Max)
    c4Max = Math.max.apply(null,c4Max)
    c5Max = Math.max.apply(null,c5Max)
    return [c1Max,c2Max,c3Max,c4Max,c5Max]
}

function prosesHitung(data ){
    let html
    kategori = maxKategori(data)
    let hasil = new Array()
    data.forEach(item => {
        hasil.push([item[0],
            item[1]/kategori[0],
            item[2]/kategori[1],
            item[3]/kategori[2],
            item[4]/kategori[3],
            item[5]/kategori[4],
        ])
    })
    return hasil
    
}

function pendek(data,jmlstr=3){
    let str
    str = data
    return str.toString().substr(0,jmlstr)
}

function bobotKriteria(data){
    let bobot = new Array()
    data.forEach((item,i) => {
        bobot.push(data[i][2])
    })
    return bobot
}

function perangkingan(data,kriteria){
    let bobot = bobotKriteria(kriteria)
    let rangking =new Array()
    data.forEach(item => {
        rangking.push(
            [(item[1]*bobot[0])+(item[2]*bobot[1])+(item[3]*bobot[2])+(item[4]*bobot[3])+(item[5]*bobot[4]),item[0]])
    })
    return rangking.sort((a,b)=> b[0]-a[0])
}
