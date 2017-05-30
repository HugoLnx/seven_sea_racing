use Rack::Static,
  :urls => ["/frameworks", "/res", "/lib", "/src"],
  :root => "."

run lambda { |env|
  case env["PATH_INFO"]
  when /main.js/
    [
      200,
      {
        'Content-Type'  => 'application/javascript',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open('./main.js', File::RDONLY)
    ]
  when /project.json/
    [
      200,
      {
        'Content-Type'  => 'application/json',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open('./project.json', File::RDONLY)
    ]
  else
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open('./index.html', File::RDONLY)
    ]
  end
}
