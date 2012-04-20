require 'sinatra'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/widthcss' do
  send_file File.join(settings.public_folder, 'widthcss.html')
end

get '/widthjs' do
  send_file File.join(settings.public_folder, 'widthjs.html')
end

get '/orientation' do
  send_file File.join(settings.public_folder, 'orientation.html')
end

get '/wrapper' do
  send_file File.join(settings.public_folder, 'wrapper.html')
end
