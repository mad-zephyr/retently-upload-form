function uploadFile(files, curretFileDiv) {
  const file = files.files[0]
  // alert(file.name+" | "+file.size+" | "+file.type);
  const formdata = new FormData()
  formdata.append('file1', file)
  const ajax = new XMLHttpRequest()

  ajax.upload.addEventListener('progress', progressHandler, false)
  ajax.addEventListener('load', completeHandler, false)
  // ajax.addEventListener('error', errorHandler, false)
  // ajax.addEventListener('abort', abortHandler, false)
  ajax.open('POST', 'file_upload_parser.php')
  // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
  // use file_upload_parser.php from above url
  ajax.send(formdata)

  function progressHandler(event) {
    curretFileDiv('loaded_n_total').innerHTML = 'Uploaded ' + event.loaded + ' bytes of ' + event.total
    const percent = (event.loaded / event.total) * 100
    curretFileDiv('progressBar').value = Math.round(percent)
    curretFileDiv('status').innerHTML = Math.round(percent) + '% uploaded... please wait'
  }

  function completeHandler(event) {
    curretFileDiv('status').innerHTML = event.target.responseText
    curretFileDiv('progressBar').value = 0 // wil clear progress bar after successful upload
  }
}

export default uploadFile
