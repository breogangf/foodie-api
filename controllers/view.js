exports.getUploadForm = function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  var form = '<form action="/api/upload" enctype="multipart/form-data" method="post">Add a title: <input name="title" type="text" /><br><br><input multiple="multiple" name="upload" type="file" /><br><br><input type="submit" value="Upload" /></form>';
  res.end(form); 
}; 

exports.getRecipeDetail = function (req, res){
  rres.sendFile(__dirname + '../public/index.html');
}; 