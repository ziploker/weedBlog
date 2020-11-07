class UserMailer < ActionMailer::Base
=begin
   require 'sendgrid-ruby'
   include SendGrid
   
   default :from => "me@mydomain.com"

   def registration_confirmation(user)

      # using SendGrid's Ruby Library
      # https://github.com/sendgrid/sendgrid-ruby
      puts "in sendgrid========================================="

      from = Email.new(email: 'test@example.com')
      to = Email.new(email: 'amsterdamAL@gmail.com')
      subject = 'Sending with SendGrid is Fun'
      content = Content.new(type: 'text/plain', value: 'and easy to do anywhere, even with Ruby')
      mail = Mail.new(from, subject, to, content)

      sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
      response = sg.client.mail._('send').post(request_body: mail.to_json)
      puts "111111111111! = " + response.status_code
      puts "22222222222222 = " + response.body
      puts "333333333333 = " + response.headers
      #@user = user
      #mail(:to => user.email, :subject => "Registration Confirmation")
end
=end
end