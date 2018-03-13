require 'sinatra'
require 'sinatra/activerecord'
require 'kramdown'
require 'yaml/store'
require 'date'

require './models.rb'

get '/' do
    @posts = Posts.all.reverse_order
    erb :index
end

post '/post' do
    author = params['author']
    message = Rack::Utils.escape_html(params['message'])
    message = Kramdown::Document.new(message).to_html

    post = Posts.new
    post.author = author
    post.message = message
    post.time_posted = DateTime.now.strftime('%s')
    post.save

    redirect '/'
end

helpers do
    def h(text)
        Rack::Utils.escape_html(text)
    end
end