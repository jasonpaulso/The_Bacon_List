# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


jobs = [
  {
    company: "Dropbox",
    title: "Web Developer",
    description: "Our Web Devs at Dropbox are front-end experts. We use HTML, CSS, Javascript and a/b testing to improve the core flows of our website. As a growth team, were extremely passionate about fast iteration and high impact code.",
    logo: "https://cfl.dropboxstatic.com/static/images/icons/blue_dropbox_glyph-vflOJKOUw.png",
    city: "San Francisco",
    state: "CA"
  },
  {
    company: "SFMOMA",
    title: "Web Developer",
    description: "This position is a critical member of the SFMOMA web team, a small in-house group that develops, builds, and maintains the SFMOMA website and other digital projects. The department's mission is to set strategy and policy around digital platforms and content, develop and test public facing digital experiences, create and disseminate digital content, and ensure that users have a consistent experience across all public-facing SFMOMA digital products.",
    logo: "https://www.sfmoma.org/sfmomamedia/static/sfmoma/images/header-logo.png",
    city: "San Francisco",
    state: "CA"
  },
  {
    company: "Amazon",
    title: "Software Engineer",
    description: "The Consumer Instock Value (CIV) team in the Inventory Planning & Control (IPC) group is responsible for the design, development and support of critical systems that simulate, predict future values Amazon’s inventory buying decisions worldwide. The goal is to replace intuition, spreadsheets and trial knowledge with automation and algorithms. You will have end-to-end ownership of software that estimates instock values millions of products on a regular basis, from initial design to production execution, in collaboration with machine learning scientist and economists. As such, you should be adept at designing and implementing low-maintenance, robust, fault-tolerant and highly scalable systems.",
    logo: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAikAAAAJDAxNDJjODM4LTY5ZmQtNGI2OC04MmViLTA4YzRlMTIyMDY0Ng.png",
    city: "Seattle",
    state: "WA"
  },
  {
    company: "Best Buy",
    title: "Software Engineer",
    description: "Best Buy is seeking innovative and technically curious Senior Engineer and Java Technical Leads to join us as we make a huge impact in the digital evolution! Be a key part of BestBuy's e-commerce Product Domain Team growth! This team drives the vision, strategy, customer experience and technical delivery of product content information systems and services throughout Best Buys e-commerce and enterprise application portfolio.",
    logo: "https://media.licdn.com/mpr/mpr/shrink_100_100/p/1/000/03c/083/30b61ca.png",
    city: "Seattle",
    state: "WA"
  },
  {
    company: "IMDb.com",
    title: "Program Manager",
    description: "We are looking for a program manager to join our team and to focus on Indian entertainment. The program manager will play an essential role at IMDb - ensuring that the content underpinning our consumer, professional and mobile experiences is complete and engaging.",
    logo: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAO_AAAAJDA4NjQzNzMwLTJiYWItNDJkMS05NzI3LTQ2ZThiMjQwNmQxZA.png",
    city: "Seattle",
    state: "WA"
  },
  {
    company: "YMCA",
    title: "Graphic Designer",
    description: "This graphic designer position will be part of a dynamic, creative and strategic marketing and communications team working to drive an exciting growth agenda for the Association while supporting Y values. The YMCA MarComm team is looking for a driven, passionate and creative individual with experience in both print and electronic media. The Graphic Designer is responsible for creating design solutions, from concept to completion, for a wide range of marketing and communications needs including: print collateral and advertising, environmental graphics and out-of-home displays, publications and fundraising materials, infographics, email design and web imagery.",
    logo: "https://media.licdn.com/mpr/mpr/shrink_100_100/p/7/000/1ed/357/26a5ef7.png",
    city: "Chicago",
    state: "IL"
  },
  {
    company: "Landor",
    title: "Graphic Designer",
    description: "We are seeking juniors, seniors and recent graduates majoring in graphic design to intern as part of our creative team. This is an opportunity to expand the learning process by participating in projects from start to finish, and interact with our design, strategy, and implementation groups.Internship candidates must have completed a minimum of 5 semesters or equivalent (junior year, second semester) should have advanced skills in Adobe Illustrator and Photoshop with intermediate skills in InDesign and Quark.",
    logo: "https://landor.com/app/themes/landor/assets/favicons/apple-touch-icon.png",
    city: "Chicago",
    state: "IL"
  },
  {
    company: "Grubhub",
    title: "Associate Art Director",
    description: "GrubHub is currently looking for a highly motivated Associate Art Director to join our internal creative team. As an Associate Art Director, you will support the b2b & partnerships teams in executing ideas to activate the Grubub brand across b2b and partnership initiatives. With a focus on growth, you will be responsible for working as an integral part of the b2b creative team, helping build the brand by delivering excellent ideas, superior design, and flawless execution in an exciting tech driven environment.",
    logo: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAASGAAAAJGZkZGE2N2E5LTY1NGQtNDIwYS1hZTYwLTkyZTZiOTdlOWE4Nw.png",
    city: "New York",
    state: "NY"
  },
  {
    company: "Pitney Bowes",
    title: "Front-End Developer",
    description: "As a Senior UX Developer at Pitney Bowes, you will translate design vision from wireframes and mockups into front-end code prototypes to help software development teams deliver products with compelling user experiences. You see opportunities where others see challenges.",
    logo: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAARzAAAAJGIyNzFhMWMyLWMzZDEtNDE4Zi1iZTMyLTFiZGU4NDU5ZjVmNg.png",
    city: "New York",
    state: "NY"
  },
  {
    company: "Chiquita Brand",
    title: "Web & Mobile Developer",
    description: "Our IT team is looking for a driven, high performing Web & Mobile Developer. The incumbent will provide business operational support as an internal technology partner. All software solutions will use a variety of languages, databases and development tools. This position will assist in major projects as needed.",
    logo: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAw4AAAAJDYxZjhmMWVlLTFhYzktNGJlMy1hYjMxLTdkZGM5YWE3OTU1Yw.png",
    city: "Miami",
    state: "FL"
  }
]


jobs.each do |job|
  Job.create(title: job[:title], description: job[:description], company: job[:company], logo_url: job[:logo], city: job[:city], state: job[:state], contact_address: "email@email.com", phone_number: "(555) 555-5555", zip: "12345")
end

