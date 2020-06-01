require 'nokogiri'

require 'httparty'

require 'pry'


require 'byebug'


	def web_scraper

		#name = name + "999999"
		selector = "//a[starts-with(@href, \"mailto:\")]/@href"

		doc = HTTParty.get("https://public.lobbytools.com/legislators/724")

		

		@parse_page = Nokogiri::HTML(doc)

		nodes = @parse_page.xpath selector

		address = nodes.collect {|n| n.value[7..-1]}

		#puts address

		return address

		#console.log(addresses)
		#byebug
	end

	def google_search (search_phrase)

		api_key = "AIzaSyAbTbFbYQsj-on_JDtx_5uIgxUWeiNZCzc"

		search_phrase_encoded = URI::encode()

		seid = "003645805095083477600:7hraibewjhe"



	end

web_scraper