

class LookupsController < ApplicationController
  #require 'pry'
  require 'httparty'
  require 'json'
  require 'hash_dot'

  require './lib/web_scraper.rb'
  require 'nokogiri'
  
  

    
  
  #googleapi 1of1 to get latitude and longitude
  #openstates 1of3 to get legislator info (image url, name, email, ocid) based on lat and lng
  #openstates 2of3 to get aditional info (party affiliation) based on legistlator "ocid" 
  #openstates 3of3 to get aditional info (party affiliation) based on legistlator "ocid" 
  
  
  #(1of3) openstates querie based on lat / lng
  def openStatesQueryBuilderPrimary (lat, lng)

    return "{
      people(latitude: "+lat+", longitude: "+lng+", first: 100) {
        edges {
          node {
            name
            image
            id
            sortName
            familyName
            givenName
            currentMemberships {
              id
            }
            links {
              note
              url
            }
            contactDetails {
              type
              value
              note
              label
            }
            chamber: currentMemberships(classification: [\"upper\", \"lower\"]) {
              organization {
                name
                classification
                parent {
                  name
                }
              }
            }
          }
        }
      }
    }
    "
  
  end


  #(2of3) and (3of3) openstates queries /one call for each legislator
  def openStatesQueryBuilderSecondary(ocid)

    return '{
      person(id:"' + ocid + '"){
        name
        contactDetails {
          note
          type
          value
        }
        otherNames {
          name
        }
        sources {
          url
        }
        currentMemberships {
          organization {
            name
          }
        }
      }
    }'
  end

  
  def hasWhiteSpace(string) 
    
    puts "in hasWhiteSpace method "
    puts "string is = "+ string
    if string.index(' ') == nil
      puts "no spaces"
    else
      puts "has a space in the string"
    end
	
  end

  
  
  #incomming form submission from react front end
  def incomming


    #object to be sent to frontend
    sendToFrontEnd = {"one" => {"name" => "", "firstName" => "", "lastName" => "", "image" => "", "id" => "", "email" => "", "chamber" => "", "party" => ""}, "two" => {"name" => "", "firstName" => "", "lastName" => "", "image" => "", "id" => "", "email" => "", "chamber" => "", "party" => ""}}


    #disable any views being rendered
    #head :ok
    
    
    #working query from json.strinigfy react front end, cant replicate with rails to_json because it keeps escaping \"\" in the start 
    #of the string '{\"query\"'
    q = '{"query":" {\n    people(latitude: 29.136800, longitude: -83.048340, first: 100) {\n      edges {\n        node {\n          name\n          image\n          id\n          sortName\n          familyName\n          givenName\n          currentMemberships {\n            id\n          }\n          links {\n            note\n            url\n          }\n          contactDetails {\n            type\n            value\n            note\n            label\n          }\n          chamber: currentMemberships(classification: [\"upper\", \"lower\"]) {\n            organization {\n              name\n              classification\n              parent {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n\n\n\n\n\n"}'
    
    

    #get api keys 
    @googleGeoApi = Rails.application.credentials.dig(:google, :geoapi)
    @openStatesApi = Rails.application.credentials.dig(:openStatesApi)

    
    #get info from react front end form, used for google api call
    @address = params[:lookup][:address]
    @zipcode = params[:lookup][:zipcode]
    puts "=====================start: got info from front end=================="
    puts "Address is = " + @address.to_s
    puts "zipcode is = " + @zipcode.to_s
    puts "=====================end: got info from front end=================="

    
    #google api call, get latitude and longitude based off user input (address/zipcode) 
    googleResponse = HTTParty.get('https://maps.googleapis.com/maps/api/geocode/json?address='+@address+','+@zipcode+'&key='+@googleGeoApi).to_dot

    @lat = googleResponse.results[0].geometry.location.lat.to_s
    @lng = googleResponse.results[0].geometry.location.lng.to_s

    puts "=====================start: google api call results=================="
    puts "lat = " + @lat.to_s
    puts "lng = " + @lng.to_s
    puts "=====================end: google api call results=================="
    
    
    
    
    #get openstates query 1of3 and convert it to json
    #should return info for 1 house and 1 senate legislator
    primaryOpenStatesQuery = openStatesQueryBuilderPrimary(@lat, @lng).to_json
    primaryOpenStatesResponse = HTTParty.get('https://openstates.org/graphql', {

        method: 'POST',
        
        headers: { "Content-Type" => "application/json",
                    "X-API-KEY" => "70717a1b-75dc-45cc-82cd-5ba4725e4f0d" },
        
        body: '{"query" : '+ primaryOpenStatesQuery + '}'
    }).to_dot

    puts "=====================start: openstates query 1of3 =================="
    puts primaryOpenStatesResponse
    puts "=====================end: openstates query 1of3=================="


    #update the hash thatll be sent to front end
    sendToFrontEnd["one"]["name"] =  primaryOpenStatesResponse.data.people.edges[0].node.name
    sendToFrontEnd["one"]["firstName"] =  primaryOpenStatesResponse.data.people.edges[0].node.givenName
    sendToFrontEnd["one"]["lastName"] =  primaryOpenStatesResponse.data.people.edges[0].node.familyName
    sendToFrontEnd["one"]["image"] =  primaryOpenStatesResponse.data.people.edges[0].node.image
    sendToFrontEnd["one"]["id"] =  primaryOpenStatesResponse.data.people.edges[0].node.id
    sendToFrontEnd["one"]["chamber"] =  primaryOpenStatesResponse.data.people.edges[0].node.chamber[0].organization.name

    sendToFrontEnd["two"]["name"] =  primaryOpenStatesResponse.data.people.edges[1].node.name
    sendToFrontEnd["two"]["firstName"] =  primaryOpenStatesResponse.data.people.edges[1].node.givenName
    sendToFrontEnd["two"]["lastName"] =  primaryOpenStatesResponse.data.people.edges[1].node.familyName
    sendToFrontEnd["two"]["image"] =  primaryOpenStatesResponse.data.people.edges[1].node.image
    sendToFrontEnd["two"]["id"] =  primaryOpenStatesResponse.data.people.edges[1].node.id
    sendToFrontEnd["two"]["chamber"] =  primaryOpenStatesResponse.data.people.edges[1].node.chamber[0].organization.name
    
    primaryOpenStatesResponse.data.people.edges[0].node.contactDetails.each do |object|
      
      if object.type === "email"
        
        sendToFrontEnd["one"]["email"] =  object.value
        break
      end

    end

    primaryOpenStatesResponse.data.people.edges[1].node.contactDetails.each do |object|
      
      if object.type === "email"
        
        sendToFrontEnd["two"]["email"] =  object.value
        break
      end

    end
    
    
    puts "=====================start: update hash with results from query =================="
    puts sendToFrontEnd
    puts "=====================end: update hash with results from query =================="
    
    
    
    

    #get openstates query 2of3 and convert it to json
    #should return adl info for house and/or senate legislator
    openStatesQuery2of3 = openStatesQueryBuilderSecondary(sendToFrontEnd["one"]["id"]).to_json
    openStatesResponse2of3 = HTTParty.get('https://openstates.org/graphql', {

        method: 'POST',
        
        headers: { "Content-Type" => "application/json",
                    "X-API-KEY" => "70717a1b-75dc-45cc-82cd-5ba4725e4f0d" },
        
        body: '{"query" : '+ openStatesQuery2of3 + '}'
    }).to_dot
    
    
    puts "=====================start: openstates query 2of3 =================="
    puts openStatesResponse2of3
    puts "=====================end: openstates query 2of3=================="
    

    #if email one is blank, look for email in this other query
    if sendToFrontEnd["one"]["email"].blank?
      puts "==================== ...double checking for email one =========================="
      openStatesResponse2of3.data.person.contactDetails.each do |object|
      
        if object.type === "email"
          puts "==================== ...email one found in second query =========================="
          puts "============ ...the email found is = " + object.value + " ============"
          sendToFrontEnd["one"]["email"] =  object.value
          break
          
        end
        
      end
      puts "==================== ...email one NOT found in second query =========================="
    end

    
    #get party affiliation
    openStatesResponse2of3.data.person.currentMemberships.each do |object|
    
      if object.organization.name === "Democratic"
        sendToFrontEnd["one"]["party"] = "Democrat"
      elsif object.organization.name === "Republican"
        sendToFrontEnd["one"]["party"] = "Republican"
      end
    end



    #get openstates query 3of3 and convert it to json
    #should return adl info for house and/or senate legislator
    openStatesQuery3of3 = openStatesQueryBuilderSecondary(sendToFrontEnd["two"]["id"]).to_json
    openStatesResponse3of3 = HTTParty.get('https://openstates.org/graphql', {

        method: 'POST',
        
        headers: { "Content-Type" => "application/json",
                    "X-API-KEY" => "70717a1b-75dc-45cc-82cd-5ba4725e4f0d" },
        
        body: '{"query" : '+ openStatesQuery3of3 + '}'
    }).to_dot
    
    
    puts "=====================start: openstates query 3of3 =================="
    puts openStatesResponse3of3
    puts "=====================end: openstates query 3of3=================="
    
   
    
    #if email two is blank, look for email in this other query
    if sendToFrontEnd["two"]["email"].blank?
      puts "==================== ...double checking for email two =========================="
      openStatesResponse3of3.data.person.contactDetails.each do |object|
      
        if object.type === "email"
          puts "==================== ...email two found in second query =========================="
          puts "============ ...the email found is = " + object.value + " ============"
          sendToFrontEnd["two"]["email"] =  object.value
          break
          
        end
        
      end
      puts "==================== ...email two NOT found in second query =========================="
    end

    #get party affiliation
    openStatesResponse3of3.data.person.currentMemberships.each do |object|
      
      
        if object.organization.name === "Democratic"
          sendToFrontEnd["two"]["party"] = "Democrat"
        elsif object.organization.name === "Republican"
          sendToFrontEnd["two"]["party"] = "Republican"
        end
    end
    
    
    puts "=====================start: update hash with results from query =================="
    puts sendToFrontEnd
    puts "=====================end: update hash with results from query =================="



    puts" ================= handle missing Senate Emails =================" 
    #handle moissing Senate emails
    #scrape other website to get missing Senate email **smh
    if sendToFrontEnd["one"]["email"].blank? && sendToFrontEnd["one"]["chamber"] === "Senate" || sendToFrontEnd["two"]["email"].blank? && sendToFrontEnd["two"]["chamber"] === "Senate"
    
      puts "handeling missing senate emails ....."
      puts "sendToFrontEnd[one][email].blank? = " + sendToFrontEnd["one"]["email"].blank?.to_s
      puts "sendToFrontEnd[one][chamber] = " + sendToFrontEnd["one"]["chamber"].to_s
      puts "sendToFrontEnd[two][email].blank? = " + sendToFrontEnd["two"]["email"].blank?.to_s
      puts "sendToFrontEnd[otwone][chamber] = " + sendToFrontEnd["two"]["chamber"].to_s
      puts "staaaart #scrape other website to get missing email **smh "
    
      #find out if SEnate is in one or two
      whereIsSenate = ""
      if sendToFrontEnd["one"]["email"].blank? && sendToFrontEnd["one"]["chamber"] === "Senate"
        whereIsSenate = "one"
      elsif sendToFrontEnd["two"]["email"].blank? && sendToFrontEnd["two"]["chamber"] === "Senate"
        whereIsSenate = "two"
      end
      puts "whereisSenate is = " + whereIsSenate
      
      @name = sendToFrontEnd["#{whereIsSenate}"]["name"]

      search_phrase_encoded = URI::encode(@name)

      senateSite = "flsenate.gov"
      houseSite = "myfloridahouse.gov"
      puts "https://www.googleapis.com/customsearch/v1?q=#{search_phrase_encoded}&cx=003645805095083477600%3Aspconqqnalh&siteSearch=#{senateSite}&key=#{@googleGeoApi}"
      thc = HTTParty.get("https://www.googleapis.com/customsearch/v1?q=#{search_phrase_encoded}&cx=003645805095083477600%3Aspconqqnalh&siteSearch=#{houseSite}&key=#{@googleGeoApi}")
    
      theLink = thc["items"][0]["link"]


      doc = HTTParty.get(theLink)
     
      @parse_page = Nokogiri::HTML(doc)

      puts "=================nokogiri parse results====================="
      #puts @parse_page
      
      selector = "//a[starts-with(@href, \"mailto:\")]/@href"

      nodes = @parse_page.xpath selector

      address = nodes.collect {|n| n.value[7..-1]}

      puts address
      
      
    end
    
    
    
    
    
    puts" ================= handle missing House Emails if blank =================" 
    if sendToFrontEnd["one"]["email"].blank? && sendToFrontEnd["one"]["chamber"] === "House" || sendToFrontEnd["two"]["email"].blank? && sendToFrontEnd["two"]["chamber"] === "House"
      
      puts "handeling missing House emails ....."
      puts "sendToFrontEnd[one][email].blank? = " + sendToFrontEnd["one"]["email"].blank?.to_s
      puts "sendToFrontEnd[one][chamber] = " + sendToFrontEnd["one"]["chamber"].to_s
      puts "sendToFrontEnd[two][email].blank? = " + sendToFrontEnd["two"]["email"].blank?.to_s
      puts "sendToFrontEnd[two][chamber] = " + sendToFrontEnd["two"]["chamber"].to_s
    
      
      puts "find out of house is in one or two"
      #findout if House is in one or two
      whereIsHouse = ""
      if sendToFrontEnd["one"]["email"].blank? && sendToFrontEnd["one"]["chamber"] === "House"
        whereIsHouse = "one"
      elsif sendToFrontEnd["two"]["email"].blank? && sendToFrontEnd["two"]["chamber"] === "House"
        whereIsHouse = "two"
      end
      puts "whereishouse is = " + whereIsHouse
    

      
      #if first and last names are not blank and have no spaces in them, use it to build the missing email -firstName.lastName@myfloridahouse.gov'
      if sendToFrontEnd["#{whereIsHouse}"]["firstName"] != "" && sendToFrontEnd["#{whereIsHouse}"]["lastName"] != "" && hasWhiteSpace( sendToFrontEnd["#{whereIsHouse}"]["firstName"]) == nil && hasWhiteSpace(sendToFrontEnd["#{whereIsHouse}"]["lastName"]) == nil
        
        puts "trying to build house email with first and lastName"  
        houseEmail = sendToFrontEnd["#{whereIsHouse}"]["firstName"]+ "." +sendToFrontEnd["#{whereIsHouse}"]["lastName"]+ "@myfloridahouse.gov"
        sendToFrontEnd["#{whereIsHouse}"]["email"] = houseEmail
      
      
      
      #if middle name exists in the full name
      elsif sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ").length == 3 && sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[1].length < 4
        
        puts "name is made up of three strings and middle name less than 4 characters"
        puts "trying to build house email with by removing middle name from full name"
        
        
        houseEmail = sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[0]+ "." +sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[2]+ "@myfloridahouse.gov"
        sendToFrontEnd["#{whereIsHouse}"]["email"] = houseEmail
       
        
      
      
      #if fullname consists from just first and last
      elsif sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ").length == 2
        puts "trying to build house email with full name"

        houseEmail = sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[0]+ "." +sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[1]+ "@myfloridahouse.gov"
        sendToFrontEnd["#{whereIsHouse}"]["email"] = houseEmail
      else
        puts "build house email with scraper"

        @name = sendToFrontEnd["#{whereIsHouse}"]["name"]

        search_phrase_encoded = URI::encode(@name)

        senateSite = "flsenate.gov"
        houseSite = "myfloridahouse.gov"
        #puts "https://www.googleapis.com/customsearch/v1?q=#{search_phrase_encoded}&cx=003645805095083477600%3A7hraibewjhe&siteSearch=lobbytools.com&key=#{@googleGeoApi}"
        thc = HTTParty.get("https://www.googleapis.com/customsearch/v1?q=#{search_phrase_encoded}&cx=003645805095083477600%3A7hraibewjhe&siteSearch=lobbytools.com&key=#{@googleGeoApi}")
      
        theLink = thc["items"][0]["link"]


        doc = HTTParty.get(theLink)
      
        @parse_page = Nokogiri::HTML(doc)

        puts "=================nokogiri parse results====================="
        #puts @parse_page
        
        selector = "//a[starts-with(@href, \"mailto:\")]/@href"

        nodes = @parse_page.xpath selector

        address = nodes.collect {|n| n.value[7..-1]}

        puts address

        sendToFrontEnd["#{whereIsHouse}"]["email"] = address

        
      end
      
     

      puts "house email created done"
      puts "email one is = " + sendToFrontEnd["one"]["email"].to_s
      puts "email two is = " + sendToFrontEnd["two"]["email"].to_s
    
    
    else
      puts "House email OK"
    end
    puts "====================final object======="
    puts sendToFrontEnd.to_json
    @sendToFrontEnd = sendToFrontEnd.to_json

    puts "-----uuuuu"
    puts @googleGeoApi
    puts sendToFrontEnd["one"]["name"]

    render json: @sendToFrontEnd

  	

end



  




    private
    
    def event_params
      params.require(:lookup).permit(:address, :zipcode, :test)
    end
end
