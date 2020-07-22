class User < ApplicationRecord

   has_secure_password

   validates_presence_of :first
   validates_presence_of :last
   validates_presence_of :email
   validates_uniqueness_of :email

   validates :password, :presence => true,
                        :confirmation => true,
                        :length => {:within => 6..40},
                        :on => :create
   validates :password, :confirmation => true,
                        :length => {:within => 6..40},
                        :allow_blank => true,
                        :on => :update
    
    
   #before_save :downcase_fields

   #def downcase_fields
      #self.email.downcase!
   #end

   def generate_password_token!
      self.reset_password_token = generate_token
      self.reset_password_sent_at = Time.now.utc

      puts "new token is " + self.reset_password_token.to_s
      save!
     end
     
   def password_token_valid?
      (self.reset_password_sent_at + 4.hours) > Time.now.utc
   end
   
   def reset_password!(password)
      self.reset_password_token = nil
      self.password = password
      save!
   end
   
   private
   
   def generate_token
      SecureRandom.hex(10)
   end
   
   
   
    

    
end
