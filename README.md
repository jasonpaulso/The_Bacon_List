# README

[The Bacon List](https://the-bacon-list.herokuapp.com): A sample web app built on Rails with a React front end.

This app allows for posting, viewing, editing, and deleting of job listings.

[The Bacon List](https://the-bacon-list.herokuapp.com) utilizes the following js/react libraries:

* 'react-router-dom’
* 'escape-string-regexp’
* 'sort-by’
* 'google-react-maps’
* 'query-string’
* 'react-phone-input’

To run the app locally please take the following steps.

* Clone the app.
* Using terminal `cd` into the repo directory.
* Run `bundle install`
* Run `rails db:migrate` & `rails db:seed`
* Run `bundle exec foreman start -f Procfile.dev` to start the app.
* View and use the app in your browser at the address provided as a response to the previous step.

To Do:

* Add mobile views
* Implement user authorization/authentication
* Add error handling
* Add input validation
* Etc...

This app is based in part on the advice and instruction provided by the following tutorials, among countless others.

* https://medium.com/statuscode/introducing-webpacker-7136d66cddfb
* https://www.pluralsight.com/guides/ruby-ruby-on-rails/building-a-crud-interface-with-react-and-ruby-on-rails
* https://medium.com/superhighfives/a-top-shelf-web-stack-rails-5-api-activeadmin-create-react-app-de5481b7ec0b