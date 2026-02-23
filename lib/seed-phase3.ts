import { execute, initDatabase, queryAll } from './db'
import { randomBytes } from 'crypto'

interface College {
  id: string
  name: string
  location: string
  rating: number
  fees_range: string
  placement_avg: string
  website: string
  image: string
  career_category: string
  admission_process: string
}

interface Scholarship {
  id: string
  name: string
  provider: string
  amount: string
  eligibility: string
  max_amount: number
  deadline: string
  category: string
}

const colleges: Partial<College>[] = [
  // Engineering & Tech
  { name: 'IIT Bombay', location: 'Mumbai', rating: 4.9, fees_range: '₹2.5L', placement_avg: '₹22 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 2000', website: 'https://www.iitb.ac.in', image: '/eng.webp' },
  { name: 'IIT Kanpur', location: 'Kanpur', rating: 4.8, fees_range: '₹2.4L', placement_avg: '₹21 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 2500', website: 'https://www.iitk.ac.in', image: '/eng.webp' },
  { name: 'IIT Kharagpur', location: 'Kharagpur', rating: 4.7, fees_range: '₹2.2L', placement_avg: '₹18 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 3000', website: 'https://www.iitkgp.ac.in', image: '/eng.webp' },
  { name: 'IIT Roorkee', location: 'Roorkee', rating: 4.6, fees_range: '₹2.1L', placement_avg: '₹17 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 3500', website: 'https://www.iitr.ac.in', image: '/eng.webp' },
  { name: 'IIT Guwahati', location: 'Guwahati', rating: 4.5, fees_range: '₹2L', placement_avg: '₹15 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 4000', website: 'https://www.iitg.ac.in', image: '/eng.webp' },
  { name: 'IIT Hyderabad', location: 'Hyderabad', rating: 4.7, fees_range: '₹2.3L', placement_avg: '₹18 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 3200', website: 'https://www.iith.ac.in', image: '/eng.webp' },
  { name: 'IIT Varanasi', location: 'Varanasi', rating: 4.6, fees_range: '₹2.2L', placement_avg: '₹16 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 3700', website: 'https://www.iitbhu.ac.in', image: '/eng.webp' },
  { name: 'IIT Delhi', location: 'Delhi', rating: 4.9, fees_range: '₹2.3L', placement_avg: '₹20 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 2500', website: 'https://home.iitd.ac.in', image: '/eng.webp' },
  { name: 'IIT Madras', location: 'Chennai', rating: 4.9, fees_range: '₹2.1L', placement_avg: '₹19 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 3000', website: 'https://www.iitm.ac.in', image: '/eng.webp' },
  { name: 'BITS Pilani', location: 'Pilani', rating: 4.8, fees_range: '₹5.5L', placement_avg: '₹18 LPA', career_category: 'Engineering & Tech', admission_process: 'BITSAT Score > 300', website: 'https://www.bits-pilani.ac.in', image: '/eng.webp' },
  { name: 'NIT Trichy', location: 'Tiruchirappalli', rating: 4.7, fees_range: '₹1.5L', placement_avg: '₹12 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Main Rank < 10000', website: 'https://www.nitt.edu', image: '/eng.webp' },
  { name: 'VIT Vellore', location: 'Vellore', rating: 4.5, fees_range: '₹2L', placement_avg: '₹8 LPA', career_category: 'Engineering & Tech', admission_process: 'VITEEE Rank < 5000', website: 'https://vit.ac.in/', image: '/eng.webp' },
  { name: 'SRM Chennai', location: 'Chennai', rating: 4.4, fees_range: '₹1.8L', placement_avg: '₹7 LPA', career_category: 'Engineering & Tech', admission_process: 'SRMJEEE Rank < 8000', website: 'https://www.srmist.edu.in/', image: '/eng.webp' },
  { name: 'Amrita Vishwa Vidyapeetham', location: 'Coimbatore', rating: 4.6, fees_range: '₹2.5L', placement_avg: '₹9 LPA', career_category: 'Engineering & Tech', admission_process: 'AEEE Rank < 6000', website: 'https://www.amrita.edu/', image: '/eng.webp' },
  { name: 'Manipal Institute of Technology', location: 'Manipal', rating: 4.5, fees_range: '₹3L', placement_avg: '₹10 LPA', career_category: 'Engineering & Tech', admission_process: 'MET Rank < 7000', website: 'https://manipal.edu/mit.html', image: '/eng.webp' },
  { name: 'IIIT Delhi', location: 'Delhi', rating: 4.7, fees_range: '₹2.8L', placement_avg: '₹15 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 4000', website: 'https://iiitd.ac.in/', image: '/eng.webp' },
  { name: 'IIIT Bangalore', location: 'Bangalore', rating: 4.6, fees_range: '₹3L', placement_avg: '₹14 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 4500', website: 'https://iiitb.ac.in/', image: '/eng.webp' },
  { name: 'IIT Patna', location: 'Patna', rating: 4.5, fees_range: '₹1.9L', placement_avg: '₹13 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 5000', website: 'https://www.iitp.ac.in/', image: '/eng.webp' },
  { name: 'IIT Bhubaneswar', location: 'Bhubaneswar', rating: 4.6, fees_range: '₹2L', placement_avg: '₹14 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 4800', website: 'https://www.iitbbs.ac.in/', image: '/eng.webp' },
  { name: 'IIT Indore', location: 'Indore', rating: 4.7, fees_range: '₹2.1L', placement_avg: '₹16 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 4200', website: 'https://www.iiti.ac.in/', image: '/eng.webp' },
  { name: 'IIT Mandi', location: 'Mandi', rating: 4.5, fees_range: '₹1.8L', placement_avg: '₹12 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Advanced Rank < 5500', website: 'https://iitmandi.ac.in/', image: '/eng.webp' },
  { name: 'DTU', location: 'Delhi', rating: 4.6, fees_range: '₹2.2L', placement_avg: '₹15 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Main Rank < 15000', website: 'https://dtu.ac.in/', image: '/eng.webp' },
  { name: 'COEP Pune', location: 'Pune', rating: 4.5, fees_range: '₹1.4L', placement_avg: '₹10 LPA', career_category: 'Engineering & Tech', admission_process: 'MHT-CET Percentile > 99', website: 'https://www.coeptech.ac.in/', image: '/eng.webp' },
  { name: 'IIIT Hyderabad', location: 'Hyderabad', rating: 4.8, fees_range: '₹3.5L', placement_avg: '₹25 LPA', career_category: 'Engineering & Tech', admission_process: 'JEE Main Rank < 3000', website: 'https://www.iiit.ac.in/', image: '/eng.webp' },
  { name: 'Jadavpur University', location: 'Kolkata', rating: 4.7, fees_range: '₹10K', placement_avg: '₹16 LPA', career_category: 'Engineering & Tech', admission_process: 'WBJEE Rank < 500', website: 'https://jadavpuruniversity.in/', image: '/eng.webp' },


  // Healthcare & Medicine
  { name: 'AIIMS New Delhi', location: 'Delhi', rating: 5.0, fees_range: '₹2K', placement_avg: '₹12 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 50', website: 'https://www.aiims.edu', image: '/health.webp' },
  { name: 'AIIMS Bangalore', location: 'Bangalore', rating: 4.9, fees_range: '₹3K', placement_avg: '₹11 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 200', website: 'https://aiimsbangalore.edu.in', image: '/health.webp' },
  { name: 'AIIMS Bhopal', location: 'Bhopal', rating: 4.7, fees_range: '₹2.5K', placement_avg: '₹9 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 300', website: 'https://aiimsbhopal.edu.in', image: '/health.webp' },
  { name: 'AIIMS Jodhpur', location: 'Jodhpur', rating: 4.8, fees_range: '₹3K', placement_avg: '₹10 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 250', website: 'https://aiimsjodhpur.edu.in', image: '/health.webp' },
  { name: 'AIIMS Lucknow', location: 'Lucknow', rating: 4.7, fees_range: '₹2.8K', placement_avg: '₹9 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 400', website: 'https://aiimslucknow.edu.in', image: '/health.webp' },
  { name: 'AIIMS Chennai', location: 'Chennai', rating: 4.8, fees_range: '₹2.5K', placement_avg: '₹10 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 300', website: 'https://aiimschennai.edu.in', image: '/health.webp' },
  { name: 'AIIMS Hyderabad', location: 'Hyderabad', rating: 4.7, fees_range: '₹3.5K', placement_avg: '₹9 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 400', website: 'https://aiimshyderabad.edu.in', image: '/health.webp' },
  { name: 'AIIMS Kolkata', location: 'Kolkata', rating: 4.8, fees_range: '₹2.8K', placement_avg: '₹10 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 350', website: 'https://aiimskolkata.edu.in', image: '/health.webp' },
  { name: 'AIIMS Patna', location: 'Patna', rating: 4.6, fees_range: '₹3K', placement_avg: '₹8 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 500', website: 'https://aiimspatna.org', image: '/health.webp' },
  { name: 'AIIMS Raipur', location: 'Raipur', rating: 4.5, fees_range: '₹3.2K', placement_avg: '₹7 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 600', website: 'https://aiimsraipur.edu.in', image: '/health.webp' },
  { name: 'AIIMS Rishikesh', location: 'Rishikesh', rating: 4.6, fees_range: '₹2.9K', placement_avg: '₹8 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 550', website: 'https://aiimsrishikesh.edu.in', image: '/health.webp' },
  { name: 'CMC Vellore', location: 'Vellore', rating: 4.9, fees_range: '₹50K', placement_avg: '₹8 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET + Aptitude Test', website: 'https://www.cmch-vellore.edu', image: '/health.webp' },
  { name: 'JIPMER', location: 'Puducherry', rating: 4.8, fees_range: '₹12K', placement_avg: '₹10 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 200', website: 'https://www.jipmer.edu.in', image: '/health.webp' },
  { name: 'KGMU', location: 'Lucknow', rating: 4.7, fees_range: '₹55K', placement_avg: '₹9 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 2000', website: 'https://www.kgmu.org', image: '/health.webp' },
  { name: 'MAMC', location: 'Delhi', rating: 4.8, fees_range: '₹4K', placement_avg: '₹11 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 100', website: 'https://www.mamc.ac.in', image: '/health.webp' },
  { name: 'AFMC Pune', location: 'Pune', rating: 4.8, fees_range: '₹30K', placement_avg: 'Commissioned Officer', career_category: 'Healthcare & Medicine', admission_process: 'NEET + Interview', website: 'https://afmc.nic.in', image: '/health.webp' },
  { name: 'Manipal College of Dental Sciences', location: 'Manipal', rating: 4.5, fees_range: '₹7L', placement_avg: '₹5 LPA', career_category: 'Healthcare & Medicine', admission_process: 'NEET Rank < 50000', website: 'https://www.manipal.edu/mcods-manipal.html', image: '/health.webp' },
  { name: 'ICT Mumbai', location: 'Mumbai', rating: 4.6, fees_range: '₹85K', placement_avg: '₹7.5 LPA', career_category: 'Engineering & Tech', admission_process: 'MHT-CET / JEE Main', website: 'https://www.ictmumbai.edu.in/', image: '/eng.webp' },


  // Business & Management
  { name: 'IIM Indore (IPM)', location: 'Indore', rating: 4.9, fees_range: '₹5L', placement_avg: '₹25 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Score', website: 'https://iimidr.ac.in/', image: '/management.jpg' },
  { name: 'IIM Ahmedabad (IPM)', location: 'Ahmedabad', rating: 5.0, fees_range: '₹6L', placement_avg: '₹30 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Score + Interview', website: 'https://www.iima.ac.in/', image: '/management.jpg' },
  { name : 'IIM Ranchi (IPM)', location: 'Ranchi', rating: 4.8, fees_range: '₹4.5L', placement_avg: '₹20 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Score', website: 'https://www.iimranchi.ac.in/', image: '/management.jpg' },
  { name: 'IIM Kozhikode (IPM)', location: 'Kozhikode', rating: 4.9, fees_range: '₹5.5L', placement_avg: '₹22 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Score + Interview', website: 'https://www.iimk.ac.in/', image: '/management.jpg' },
  { name: 'IIM Amritsar (IPM)', location: 'Amritsar', rating: 4.7, fees_range: '₹4L', placement_avg: '₹18 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Score', website: 'https://iimamritsar.ac.in/', image: '/management.jpg' },
  { name: 'IIM Udaipur (IPM)', location: 'Udaipur', rating: 4.8, fees_range: '₹4.8L', placement_avg: '₹19 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Score + Interview', website: 'https://www.iimu.ac.in/', image: '/management.jpg' },
  { name: 'IIM Nagpur (IPM)', location: 'Nagpur', rating: 4.7, fees_range: '₹4.2L', placement_avg: '₹17 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Score', website: 'https://iimnagpur.ac.in/', image: '/management.jpg' },
  { name: 'IIM Visakhapatnam (IPM)', location: 'Visakhapatnam', rating: 4.6, fees_range: '₹4L', placement_avg: '₹16 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Score + Interview', website: 'https://iimv.ac.in/', image: '/management.jpg' },
  { name: 'IIM Bodh Gaya (IPM)', location: 'Bodh Gaya', rating: 4.5, fees_range: '₹3.8L', placement_avg: '₹15 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Score', website: 'https://iimbg.ac.in/', image: '/management.jpg' },
  { name: 'IIM Sambalpur (IPM)', location: 'Sambalpur', rating: 4.6, fees_range: '₹3.5L', placement_avg: '₹14 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Score + Interview', website: 'https://iimsambalpur.ac.in/', image: '/management.jpg' },
  { name: 'IIM Rohtak (IPM)', location: 'Rohtak', rating: 4.8, fees_range: '₹4.5L', placement_avg: '₹18 LPA', career_category: 'Business & Management', admission_process: 'IPMAT Rohtak', website: 'https://www.iimrohtak.ac.in/', image: '/management.jpg' },
  { name: 'SRCC', location: 'Delhi', rating: 4.9, fees_range: '₹30K', placement_avg: '₹9 LPA', career_category: 'Business & Management', admission_process: 'CUET Score > 780/800', website: 'https://www.srcc.edu/', image: '/management.jpg' },
  { name: 'Shaheed Sukhdev (SSCBS)', location: 'Delhi', rating: 4.8, fees_range: '₹25K', placement_avg: '₹10 LPA', career_category: 'Business & Management', admission_process: 'CUET + General Test', website: 'https://sscbs.du.ac.in/', image: '/management.jpg' },
  { name: 'NMIMS Mumbai', location: 'Mumbai', rating: 4.7, fees_range: '₹3.5L', placement_avg: '₹18 LPA', career_category: 'Business & Management', admission_process: 'NPAT Rank < 1000', website: 'https://www.nmims.edu/', image: '/management.jpg' },
  { name: 'Christ University', location: 'Bangalore', rating: 4.6, fees_range: '₹2L', placement_avg: '₹6 LPA', career_category: 'Business & Management', admission_process: 'CUET / Christ Entrance', website: 'https://christuniversity.in/', image: '/management.jpg' },
  { name: 'Loyola College', location: 'Chennai', rating: 4.7, fees_range: '₹20K', placement_avg: '₹5 LPA', career_category: 'Business & Management', admission_process: '12th Marks > 90%', website: 'https://www.loyolacollege.edu/', image: '/management.jpg' },
  { name: 'St. Xavier\'s College', location: 'Mumbai', rating: 4.8, fees_range: '₹25K', placement_avg: '₹6 LPA', career_category: 'Business & Management', admission_process: '12th Marks > 92%', website: 'https://xaviers.edu/', image: '/management.jpg' },
  { name: 'SCMS Pune', location: 'Pune', rating: 4.7, fees_range: '₹3.5L', placement_avg: '₹8 LPA', career_category: 'Business & Management', admission_process: 'SET Score', website: 'https://scmspune.ac.in/', image: '/management.jpg' },
  { name: 'Mount Carmel College', location: 'Bangalore', rating: 4.5, fees_range: '₹1.5L', placement_avg: '₹5 LPA', career_category: 'Business & Management', admission_process: 'Merit + Interview', website: 'https://mccblr.edu.in/', image: '/management.jpg' },
  { name: 'Madras Christian College', location: 'Chennai', rating: 4.6, fees_range: '₹30K', placement_avg: '₹5.5 LPA', career_category: 'Business & Management', admission_process: 'Merit List', website: 'https://mcc.edu.in/', image: '/management.jpg' },


  // Defense & Govt
  { name: 'NDA Pune', location: 'Pune', rating: 5.0, fees_range: '₹0', placement_avg: 'Commissioned Officer', career_category: 'Defense & Govt', admission_process: 'UPSC NDA Exam', website: 'https://nda.nic.in/', image: '/defense.jpg' },
  { name: 'Indian Naval Academy', location: 'Ezhimala', rating: 4.9, fees_range: '₹0', placement_avg: 'Commissioned Officer', career_category: 'Defense & Govt', admission_process: 'UPSC NDA / JEE Main', website: 'https://www.joinindiannavy.gov.in/en/', image: '/defense.jpg' },
  { name: 'AFCAT Academy', location: 'Dehradun', rating: 4.8, fees_range: '₹0', placement_avg: 'Commissioned Officer', career_category: 'Defense & Govt', admission_process: 'AFCAT Exam', website: 'https://indianairforce.nic.in/', image: '/defense.jpg' },
  { name: 'IMA Dehradun', location: 'Dehradun', rating: 4.9, fees_range: '₹0', placement_avg: 'Commissioned Officer', career_category: 'Defense & Govt', admission_process: 'UPSC CDS', website: 'https://indianarmy.nic.in/', image: '/defense.jpg' },
  { name: 'IMA Dehradun', location: 'Dehradun', rating: 4.9, fees_range: '₹0', placement_avg: 'Commissioned Officer', career_category: 'Defense & Govt', admission_process: 'UPSC CDS', website: 'https://indianarmy.nic.in/', image: '/defense.jpg' },
  { name: 'Air Force Academy', location: 'Dundigal', rating: 4.9, fees_range: '₹0', placement_avg: 'Commissioned Officer', career_category: 'Defense & Govt', admission_process: 'UPSC CDS / AFCAT', website: 'https://indianairforce.nic.in/', image: '/defense.jpg' },
  { name: 'OTA Chennai', location: 'Chennai', rating: 4.8, fees_range: '₹0', placement_avg: 'Commissioned Officer', career_category: 'Defense & Govt', admission_process: 'UPSC CDS', website: 'https://www.otaaachennai.com/', image: '/defense.jpg' },

  // Law & Governance
  { name: 'NLSIU Bangalore', location: 'Bangalore', rating: 5.0, fees_range: '₹2.8L', placement_avg: '₹16 LPA', career_category: 'Law & Governance', admission_process: 'CLAT Rank < 100', website: 'https://www.nls.ac.in/', image: '/law.jpg' },
  { name: 'NLU Jodhpur', location: 'Jodhpur', rating: 4.9, fees_range: '₹2.7L', placement_avg: '₹15 LPA', career_category: 'Law & Governance', admission_process: 'CLAT Rank < 150', website: 'https://www.nlujodhpur.ac.in/', image: '/law.jpg' },
  { name: 'NUJS Kolkata', location: 'Kolkata', rating: 4.8, fees_range: '₹2.6L', placement_avg: '₹14 LPA', career_category: 'Law & Governance', admission_process: 'CLAT Rank < 200', website: 'https://www.nujs.edu/', image: '/law.jpg' },
  { name: 'NALSAR Hyderabad', location: 'Hyderabad', rating: 4.9, fees_range: '₹2.6L', placement_avg: '₹15 LPA', career_category: 'Law & Governance', admission_process: 'CLAT Rank < 250', website: 'https://nalsar.ac.in/', image: '/law.jpg' },
  { name: 'NLU Delhi', location: 'Delhi', rating: 4.8, fees_range: '₹2.5L', placement_avg: '₹14 LPA', career_category: 'Law & Governance', admission_process: 'AILET Rank < 100', website: 'https://nludelhi.ac.in/', image: '/law.jpg' },
  { name: 'Symbiosis Law School', location: 'Pune', rating: 4.6, fees_range: '₹3.5L', placement_avg: '₹10 LPA', career_category: 'Law & Governance', admission_process: 'SLAT Score', website: 'https://www.symlaw.ac.in/', image: '/law.jpg' },
  { name: 'GLC Mumbai', location: 'Mumbai', rating: 4.5, fees_range: '₹7K', placement_avg: '₹8 LPA', career_category: 'Law & Governance', admission_process: 'MHCET Law > 120/150', website: 'https://www.glcmumbai.com/', image: '/law.jpg' },
  { name: 'Miranda House', location: 'Delhi', rating: 4.7, fees_range: '₹18K', placement_avg: '₹6 LPA', career_category: 'Law & Governance', admission_process: 'CUET Score > 750', website: 'https://www.mirandahouse.ac.in/', image: '/law.jpg' },
  { name: 'TISS Mumbai', location: 'Mumbai', rating: 4.8, fees_range: '₹60K', placement_avg: '₹18 LPA', career_category: 'Law & Governance', admission_process: 'TISSNET / CUET-PG', website: 'https://tiss.ac.in/', image: '/law.jpg' },


  // Aviation & Transport
  { name: 'IGRUA', location: 'Raebareli', rating: 4.6, fees_range: '₹45L', placement_avg: '₹30 LPA', career_category: 'Aviation & Transport', admission_process: 'IGRUA Entrance + Interview', website: 'https://igrua.gov.in/', image: '/aviation.jpg' },
  { name: 'NFTI', location: 'Gondia', rating: 4.5, fees_range: '₹42L', placement_avg: '₹25 LPA', career_category: 'Aviation & Transport', admission_process: 'Merit + Interview', website: 'https://www.cae.com/civil-aviation/locations/cae-gondia-nfti/', image: '/aviation.jpg' },
  { name: 'CAE Global Academy', location: 'Mumbai', rating: 4.4, fees_range: '₹50L', placement_avg: '₹28 LPA', career_category: 'Aviation & Transport', admission_process: 'CAE Aptitude Test + Interview', website: 'https://www.cae.com/civil-aviation/locations/cae-mumbai/', image: '/aviation.jpg' },
  { name: 'Capt. Sahil Khurana Flying School', location: 'Chandigarh', rating: 4.3, fees_range: '₹40L', placement_avg: '₹22 LPA', career_category: 'Aviation & Transport', admission_process: 'Merit + Interview', website: 'https://www.captainkhurana.com/', image: '/aviation.jpg' },
  { name: 'Indian Aviation Academy', location: 'Delhi', rating: 4.4, fees_range: '₹1.5L', placement_avg: '₹6 LPA', career_category: 'Aviation & Transport', admission_process: 'Entrance Exam', website: 'https://iaa.edu.in/', image: '/aviation.jpg' },

  // Design & Arts
  { name: 'NID Ahmedabad', location: 'Ahmedabad', rating: 4.9, fees_range: '₹3L', placement_avg: '₹12 LPA', career_category: 'Design & Arts', admission_process: 'NID DAT Prelims + Mains', website: 'https://www.nid.edu/home', image: '/design.webp' },
  { name: 'NID Bangalore', location: 'Bangalore', rating: 4.8, fees_range: '₹3.2L', placement_avg: '₹11 LPA', career_category: 'Design & Arts', admission_process: 'NID DAT Prelims + Mains', website: 'https://www.nid.edu/', image: '/design.webp' },
  { name: 'NID Gandhinagar', location: 'Gandhinagar', rating: 4.7, fees_range: '₹2.8L', placement_avg: '₹10 LPA', career_category: 'Design & Arts', admission_process: 'NID DAT Prelims + Mains', website: 'https://www.nid.edu/', image: '/design.webp' },
  { name: 'NIFT Mumbai', location: 'Mumbai', rating: 4.8, fees_range: '₹2.9L', placement_avg: '₹7 LPA', career_category: 'Design & Arts', admission_process: 'NIFT Entrance Rank < 400', website: 'https://www.nift.ac.in/mumbai/', image: '/design.webp' },
  { name: 'NIFT Chennai', location: 'Chennai', rating: 4.7, fees_range: '₹2.6L', placement_avg: '₹6.5 LPA', career_category: 'Design & Arts', admission_process: 'NIFT Entrance Rank < 450', website: 'https://www.nift.ac.in/chennai/', image: '/design.webp' },
  { name: 'NIFT Kolkata', location: 'Kolkata', rating: 4.6, fees_range: '₹2.5L', placement_avg: '₹6 LPA', career_category: 'Design & Arts', admission_process: 'NIFT Entrance Rank < 500', website: 'https://www.nift.ac.in/kolkata/', image: '/design.webp' },
  { name: 'NIFT Hyderabad', location: 'Hyderabad', rating: 4.7, fees_range: '₹2.8L', placement_avg: '₹7 LPA', career_category: 'Design & Arts', admission_process: 'NIFT Entrance Rank < 400', website: 'https://www.nift.ac.in/hyderabad/', image: '/design.webp' },
  { name: 'NIFT Bangalore', location: 'Bangalore', rating: 4.8, fees_range: '₹2.9L', placement_avg: '₹7.5 LPA', career_category: 'Design & Arts', admission_process: 'NIFT Entrance Rank < 350', website: 'https://www.nift.ac.in/bangalore/', image: '/design.webp' },
  { name: 'NIFT Delhi', location: 'Delhi', rating: 4.8, fees_range: '₹2.7L', placement_avg: '₹6 LPA', career_category: 'Design & Arts', admission_process: 'NIFT Entrance Rank < 500', website: 'https://www.nift.ac.in/delhi/', image: '/design.webp' },
  { name: 'IDC IIT Bombay', location: 'Mumbai', rating: 4.9, fees_range: '₹2.5L', placement_avg: '₹15 LPA', career_category: 'Design & Arts', admission_process: 'UCEED Rank < 50', website: 'https://www.idc.iitb.ac.in/', image: '/design.webp' },
  { name: 'Srishti Manipal', location: 'Bangalore', rating: 4.6, fees_range: '₹5L', placement_avg: '₹6 LPA', career_category: 'Design & Arts', admission_process: 'SMEAT', website: 'https://srishtimanipalinstitute.in/', image: '/design.webp' },
  { name: 'JJ School of Art', location: 'Mumbai', rating: 4.7, fees_range: '₹25K', placement_avg: '₹5 LPA', career_category: 'Design & Arts', admission_process: 'MH-AAC-CET', website: 'https://www.sirjjschoolofart.in/', image: '/design.webp' },

  // Science & Research
  { name: 'IISc Bangalore', location: 'Bangalore', rating: 5.0, fees_range: '₹30K', placement_avg: '₹20 LPA', career_category: 'Science & Research', admission_process: 'JEE Adv / IAT / NEET', website: 'https://iisc.ac.in/', image: '/science.webp' },
  { name: 'TIFR Mumbai', location: 'Mumbai', rating: 4.9, fees_range: '₹40K', placement_avg: '₹18 LPA', career_category: 'Science & Research', admission_process: 'TIFR GS Exam', website: 'https://www.tifr.res.in/', image: '/science.webp' },
  { name: 'IISER Kolkata', location: 'Kolkata', rating: 4.8, fees_range: '₹85K', placement_avg: '₹12 LPA', career_category: 'Science & Research', admission_process: 'IAT (IISER Aptitude Test)', website: 'https://www.iiserkol.ac.in/', image: '/science.webp' },
  { name: 'IISER Mohali', location: 'Mohali', rating: 4.7, fees_range: '₹80K', placement_avg: '₹11 LPA', career_category: 'Science & Research', admission_process: 'IAT (IISER Aptitude Test)', website: 'https://www.iisermohali.ac.in/', image: '/science.webp' },
  { name: 'IISER Bhopal', location: 'Bhopal', rating: 4.6, fees_range: '₹75K', placement_avg: '₹10 LPA', career_category: 'Science & Research', admission_process: 'IAT (IISER Aptitude Test)', website: 'https://www.iiserb.ac.in/', image: '/science.webp' },
  { name: 'IISER Thiruvananthapuram', location: 'Thiruvananthapuram', rating: 4.7, fees_range: '₹85K', placement_avg: '₹11 LPA', career_category: 'Science & Research', admission_process: 'IAT (IISER Aptitude Test)', website: 'https://www.iisertvm.ac.in/', image: '/science.webp' },
  { name: 'IISER Tirupati', location: 'Tirupati', rating: 4.5, fees_range: '₹70K', placement_avg: '₹9 LPA', career_category: 'Science & Research', admission_process: 'IAT (IISER Aptitude Test)', website: 'https://www.iisertirupati.ac.in/', image: '/science.webp' },
  { name: 'IISER Hyderabad', location: 'Hyderabad', rating: 4.6, fees_range: '₹80K', placement_avg: '₹10 LPA', career_category: 'Science & Research', admission_process: 'IAT (IISER Aptitude Test)', website: 'https://www.iiserhyd.ac.in/', image: '/science.webp' },
  { name: 'IISER Pune', location: 'Pune', rating: 4.8, fees_range: '₹90K', placement_avg: '₹10 LPA', career_category: 'Science & Research', admission_process: 'IAT (IISER Aptitude Test)', website: 'https://www.iiserpune.ac.in/', image: '/science.webp' },
  { name: 'BHU', location: 'Varanasi', rating: 4.7, fees_range: '₹10K', placement_avg: '₹6 LPA', career_category: 'Science & Research', admission_process: 'CUET', website: 'https://www.bhu.ac.in/Site/Home/1_2_16_Main-Site', image: '/science.webp' },
  { name: 'St. Stephen\'s College', location: 'Delhi', rating: 4.8, fees_range: '₹40K', placement_avg: '₹8 LPA', career_category: 'Science & Research', admission_process: 'CUET + Interview', website: 'https://www.ststephens.edu/', image: '/science.webp' },

  // Agriculture
  { name: 'GB Pant Univ', location: 'Pantnagar', rating: 4.6, fees_range: '₹40K', placement_avg: '₹5 LPA', career_category: 'Agriculture', admission_process: 'ICAR AIEEA / GBPUAT', website: 'https://gbpuat.ac.in/', image: '/agri.jpg' },
  { name: 'IARI', location: 'Delhi', rating: 4.8, fees_range: '₹25K', placement_avg: '₹6 LPA', career_category: 'Agriculture', admission_process: 'ICAR AIEEA', website: 'https://iari.res.in/', image: '/agri.jpg' },
  { name: 'JNKVV Jabalpur', location: 'Jabalpur', rating: 4.5, fees_range: '₹30K', placement_avg: '₹4.5 LPA', career_category: 'Agriculture', admission_process: 'ICAR AIEEA / JNKVV Entrance', website: 'https://www.jnkvv.org/', image: '/agri.jpg' },
  { name: 'UAS Bangalore', location: 'Bangalore', rating: 4.7, fees_range: '₹50K', placement_avg: '₹5.5 LPA', career_category: 'Agriculture', admission_process: 'ICAR AIEEA / UAS Entrance', website: 'https://www.uasbangalore.edu.in/', image: '/agri.jpg' },
  { name: 'TNAU Coimbatore', location: 'Coimbatore', rating: 4.6, fees_range: '₹45K', placement_avg: '₹5 LPA', career_category: 'Agriculture', admission_process: 'TNAU Entrance / ICAR AIEEA', website: 'https://www.tnau.ac.in/', image: '/agri.jpg' },
  { name: 'PAU Ludhiana', location: 'Ludhiana', rating: 4.6, fees_range: '₹60K', placement_avg: '₹4.5 LPA', career_category: 'Agriculture', admission_process: 'PAU CET', website: 'https://pauwp.pau.edu/', image: '/agri.jpg' },
  { name: 'CCS HAU Hisar', location: 'Hisar', rating: 4.5, fees_range: '₹35K', placement_avg: '₹4 LPA', career_category: 'Agriculture', admission_process: 'ICAR AIEEA', website: 'https://www.hau.ac.in/', image: '/agri.jpg' }, 
  { name: 'SVPUAT Meerut', location: 'Meerut', rating: 4.4, fees_range: '₹30K', placement_avg: '₹4 LPA', career_category: 'Agriculture', admission_process: 'SVPUAT Entrance / ICAR AIEEA', website: 'https://www.svbpmeerut.ac.in/', image: '/agri.jpg' },
  { name: 'ANGRAU Hyderabad', location: 'Hyderabad', rating: 4.5, fees_range: '₹40K', placement_avg: '₹5 LPA', career_category: 'Agriculture', admission_process: 'ANGRAU Entrance / ICAR AIEEA', website: 'https://angrau.ac.in/', image: '/agri.jpg' },
  { name: 'UAS Dharwad', location: 'Dharwad', rating: 4.6, fees_range: '₹50K', placement_avg: '₹5.5 LPA', career_category: 'Agriculture', admission_process: 'ICAR AIEEA / UAS Entrance', website: 'https://uasd.edu.in/', image: '/agri.jpg' },
  { name: 'MPUAT Udaipur', location: 'Udaipur', rating: 4.4, fees_range: '₹30K', placement_avg: '₹4 LPA', career_category: 'Agriculture', admission_process: 'MPUAT Entrance / ICAR AIEEA', website: 'https://www.mpuat.ac.in/', image: '/agri.jpg' },
  { name: 'BAU Sabour', location: 'Sabour', rating: 4.3, fees_range: '₹25K', placement_avg: '₹3.5 LPA', career_category: 'Agriculture', admission_process: 'BAU Entrance / ICAR AIEEA', website: 'https://bau.ac.in/', image: '/agri.jpg' },
  { name: 'SKNAU Jobner', location: 'Jobner', rating: 4.2, fees_range: '₹20K', placement_avg: '₹3 LPA', career_category: 'Agriculture', admission_process: 'SKNAU Entrance / ICAR AIEEA', website: 'https://www.sknau.ac.in/', image: '/agri.jpg' },
  { name: 'UHF Solan', location: 'Solan', rating: 4.3, fees_range: '₹25K', placement_avg: '₹3.5 LPA', career_category: 'Agriculture', admission_process: 'UHF Entrance / ICAR AIEEA', website: 'https://uhf.ac.in/', image: '/agri.jpg' },
  { name: 'CAU Imphal', location: 'Imphal', rating: 4.4, fees_range: '₹30K', placement_avg: '₹4 LPA', career_category: 'Agriculture', admission_process: 'CAU Entrance / ICAR AIEEA', website: 'https://cau.ac.in/', image: '/agri.jpg' },
  { name: 'RBSAU Bikaner', location: 'Bikaner', rating: 4.2, fees_range: '₹20K', placement_avg: '₹3 LPA', career_category: 'Agriculture', admission_process: 'RBSAU Entrance / ICAR AIEEA', website: 'https://www.rbsauniv.ac.in/', image: '/agri.jpg' },
  { name: 'UAS Raichur', location: 'Raichur', rating: 4.3, fees_range: '₹25K', placement_avg: '₹3.5 LPA', career_category: 'Agriculture', admission_process: 'ICAR AIEEA / UAS Entrance', website: 'https://uasr.ac.in/', image: '/agri.jpg' },
  { name: 'DU College of Vocational Studies', location: 'Delhi', rating: 4.5, fees_range: '₹15K', placement_avg: '₹4 LPA', career_category: 'Agriculture', admission_process: 'CUET Score > 700', website: 'https://cvs.du.ac.in/', image: '/agri.jpg' },

  // Vocational & Others
  { name: 'IHM Pusa', location: 'Delhi', rating: 4.7, fees_range: '₹1.2L', placement_avg: '₹5 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 300', website: 'https://ihmpusa.net/', image: '/vocational.jpg' },
  { name: 'IHM Mumbai', location: 'Mumbai', rating: 4.6, fees_range: '₹1.1L', placement_avg: '₹5 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 600', website: 'https://www.ihmctan.edu/', image: '/vocational.jpg' },
  { name: 'IHM Bangalore', location: 'Bangalore', rating: 4.5, fees_range: '₹1L', placement_avg: '₹4.5 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 800', website: 'https://ihmbangalore.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Chennai', location: 'Chennai', rating: 4.4, fees_range: '₹90K', placement_avg: '₹4 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1000', website: 'https://ihmchennai.org/', image: '/vocational.jpg' },
  { name: 'IHM Goa', location: 'Goa', rating: 4.5, fees_range: '₹95K', placement_avg: '₹4.2 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 900', website: 'https://ihmgoa.gov.in/', image: '/vocational.jpg' },
  { name: 'IHM Hyderabad', location: 'Hyderabad', rating: 4.6, fees_range: '₹1L', placement_avg: '₹4.5 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 800', website: 'https://ihmhyd.org/', image: '/vocational.jpg' },
  { name: 'IHM Jaipur', location: 'Jaipur', rating: 4.4, fees_range: '₹90K', placement_avg: '₹4 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1000', website: 'https://ihmjaipur.com/', image: '/vocational.jpg' },
  { name: 'IHM Kolkata', location: 'Kolkata', rating: 4.5, fees_range: '₹95K', placement_avg: '₹4.2 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 900', website: 'https://ihmkol.org/', image: '/vocational.jpg' },
  { name: 'IHM Lucknow', location: 'Lucknow', rating: 4.4, fees_range: '₹90K', placement_avg: '₹4 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1000', website: 'https://ihmlucknow.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Ooty', location: 'Ooty', rating: 4.3, fees_range: '₹85K', placement_avg: '₹3.8 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1200', website: 'https://ihmooty.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Panchkula', location: 'Panchkula', rating: 4.4, fees_range: '₹90K', placement_avg: '₹4 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1000', website: 'https://ihmpanchkula.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Shimla', location: 'Shimla', rating: 4.3, fees_range: '₹85K', placement_avg: '₹3.8 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1200', website: 'https://ihmshimla.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Srinagar', location: 'Srinagar', rating: 4.2, fees_range: '₹80K', placement_avg: '₹3.5 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1300', website: 'https://ihmsrinagar.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Thrissur', location: 'Thrissur', rating: 4.3, fees_range: '₹85K', placement_avg: '₹3.8 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1200', website: 'https://ihmthrissur.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Udaipur', location: 'Udaipur', rating: 4.4, fees_range: '₹90K', placement_avg: '₹4 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1000', website: 'https://ihmudaipur.org/', image: '/vocational.jpg' },
  { name: 'IHM Varanasi', location: 'Varanasi', rating: 4.2, fees_range: '₹80K', placement_avg: '₹3.5 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1300', website: 'https://ihmvaranasi.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Bhopal', location: 'Bhopal', rating: 4.3, fees_range: '₹85K', placement_avg: '₹3.8 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1200', website: 'https://ihmbhopal.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Raipur', location: 'Raipur', rating: 4.2, fees_range: '₹80K', placement_avg: '₹3.5 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1300', website: 'https://ihmraipur.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Dehradun', location: 'Dehradun', rating: 4.4, fees_range: '₹90K', placement_avg: '₹4 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1000', website: 'https://ihmdehradun.ac.in/', image: '/vocational.jpg' },
  { name: 'IHM Kurukshetra', location: 'Kurukshetra', rating: 4.3, fees_range: '₹85K', placement_avg: '₹3.8 LPA', career_category: 'Vocational & Others', admission_process: 'NCHMCT JEE Rank < 1200', website: 'https://ihmkurukshetra.ac.in/', image: '/vocational.jpg' },
  { name: 'WGSHA Manipal', location: 'Manipal', rating: 4.7, fees_range: '₹4L', placement_avg: '₹7 LPA', career_category: 'Vocational & Others', admission_process: 'Merit + Interview', website: 'https://www.manipal.edu/wgsha.html', image: '/vocational.jpg' },

  // Education
  { name: 'RIE Mysore', location: 'Mysore', rating: 4.6, fees_range: '₹25K', placement_avg: '₹4 LPA', career_category: 'Education', admission_process: 'RIE CEE', website: 'https://riesc.mysore.gov.in/', image: '/teaching.jpg' },
  { name: 'NCERT Delhi', location: 'Delhi', rating: 4.5, fees_range: '₹30K', placement_avg: '₹4.5 LPA', career_category: 'Education', admission_process: 'CUET-PG', website: 'https://ncert.nic.in/', image: '/teaching.jpg' },
  { name: 'TISS Hyderabad', location: 'Hyderabad', rating: 4.7, fees_range: '₹70K', placement_avg: '₹10 LPA', career_category: 'Education', admission_process: 'TISSNET / CUET-PG', website: 'https://tiss.edu/', image: '/teaching.jpg' },
  { name: 'JNU Education Faculty', location: 'Delhi', rating: 4.8, fees_range: '₹20K', placement_avg: '₹8 LPA', career_category: 'Education', admission_process: 'CUET-PG',website: 'https://www.jnu.ac.in/SIS/Faculty/Education', image: '/teaching.jpg' },
  { name: 'Jamia Millia Islamia', location: 'Delhi', rating: 4.6, fees_range: '₹15K', placement_avg: '₹6 LPA', career_category: 'Education', admission_process: 'CUET Score > 700', website: 'https://www.jmi.ac.in/', image: '/teaching.jpg' },
  { name: 'BHU Education Faculty', location: 'Varanasi', rating: 4.5, fees_range: '₹10K', placement_avg: '₹5 LPA', career_category: 'Education', admission_process: 'CUET Score > 650', website: 'https://www.bhu.ac.in/education/', image: '/teaching.jpg' },
  { name: 'DU (SSE)', location: 'Delhi', rating: 4.6, fees_range: '₹12K', placement_avg: '₹5.5 LPA', career_category: 'Education', admission_process: 'CUET Score > 700', website: 'https://sse.du.ac.in/', image: '/teaching.jpg' },
  { name: 'IGNOU', location: 'Delhi', rating: 4.4, fees_range: '₹5K', placement_avg: '₹4 LPA', career_category: 'Education', admission_process: 'Open Admission', website: 'https://ignou.ac.in/', image: '/teaching.jpg' },
  { name: 'TISS Mumbai (Education)', location: 'Mumbai', rating: 4.7, fees_range: '₹60K', placement_avg: '₹9 LPA', career_category: 'Education', admission_process: 'TISSNET / CUET-PG', website: 'https://tiss.edu/', image: '/teaching.jpg' },
  { name: 'NCERT RIE Bhopal', location: 'Bhopal', rating: 4.5, fees_range: '₹25K', placement_avg: '₹4 LPA', career_category: 'Education', admission_process: 'RIE CEE',website: 'https://riesc.bhopal.gov.in/', image: '/teaching.jpg'},
  { name: 'DU (EFLU)', location: 'Hyderabad', rating: 4.6, fees_range: '₹18K', placement_avg: '₹6 LPA', career_category: 'Education', admission_process: 'EFLU Entrance', website: 'https://efluniversity.ac.in/', image: '/teaching.jpg' },
  { name: 'DU (CIE)', location: 'Delhi', rating: 4.7, fees_range: '₹15K', placement_avg: '₹5 LPA', career_category: 'Education', admission_process: 'DU B.Ed Entrance', website: 'https://cie.du.ac.in/', image: '/teaching.jpg' },

  // Railways
  { name: 'Gati Shakti Univ', location: 'Vadodara', rating: 4.5, fees_range: '₹1.8L', placement_avg: '₹6 LPA', career_category: 'Railways', admission_process: 'CUET / JEE Main', website: 'https://gsv.ac.in/', image: '/rail.jpg' },
  { name: 'IRIMEE', location: 'Jamalpur', rating: 4.4, fees_range: '₹0', placement_avg: 'Commissioned Officer', career_category: 'Railways', admission_process: 'UPSC SCRA', website: 'https://irimee.in/', image: '/rail.jpg' },
  { name: 'IITTM', location: 'Gwalior', rating: 4.3, fees_range: '₹1.5L', placement_avg: '₹5 LPA', career_category: 'Railways', admission_process: 'CUET / JEE Main', website: 'https://www.iittm.ac.in/', image: '/rail.jpg' },
]

const scholarships: Partial<Scholarship>[] = [
  { name: 'INSPIRE Scholarship', provider: 'DST, Govt of India', amount: '₹80,000 / year', eligibility: 'Top 1% in 12th Boards', max_amount: 80000, deadline: '31st Dec', category: 'Science & Research' },
  { name: 'KVPY Fellowship', provider: 'DST, Govt of India', amount: '₹5,000 - ₹7,000 / month', eligibility: 'Science Stream (XI, XII, UG)', max_amount: 84000, deadline: '30th Oct', category: 'Science & Research' },
  { name: 'PMSSS (J&K Students)', provider: 'AICTE', amount: 'Up to ₹3 Lakh / year', eligibility: 'J&K Domicile', max_amount: 300000, deadline: '31st July', category: 'General' },
  { name: 'ONGC Scholarship', provider: 'ONGC', amount: '₹48,000 / year', eligibility: 'SC/ST/OBC in Engineering/MBBS', max_amount: 48000, deadline: '15th Oct', category: 'Engineering & Tech' },
  { name: 'NTPC Scholarship', provider: 'NTPC', amount: '₹48,000 / year', eligibility: 'SC/ST/PwD in Engineering', max_amount: 48000, deadline: '31st Aug', category: 'Engineering & Tech' },
  { name: 'AICTE Pragati (Girls)', provider: 'AICTE', amount: '₹50,000 / year', eligibility: 'Girls in Technical Degree', max_amount: 50000, deadline: '30th Nov', category: 'Engineering & Tech' },
  { name: 'AICTE Saksham (PwD)', provider: 'AICTE', amount: '₹50,000 / year', eligibility: 'Differently Abled Students', max_amount: 50000, deadline: '30th Nov', category: 'General' },
  { name: 'Narotam Sekhsaria', provider: 'Narotam Sekhsaria Foundation', amount: 'Interest-free Loan (Variable)', eligibility: 'PG in Top Institutes', max_amount: 2000000, deadline: '15th March', category: 'General' },
  { name: 'Tata Trust Scholarship', provider: 'Tata Trust', amount: 'Variable', eligibility: 'Merit-based for Medical/Engg', max_amount: 100000, deadline: 'Variable', category: 'General' },
  { name: 'Aditya Birla Scholarship', provider: 'Aditya Birla Group', amount: '₹1.8 Lakh / year', eligibility: 'Top Rankers in IITs/IIMs', max_amount: 180000, deadline: '31st July', category: 'Engineering & Tech' },
  { name: 'HDFC Badte Kadam', provider: 'HDFC Bank', amount: 'Up to ₹1 Lakh', eligibility: 'Merit + Need Based', max_amount: 100000, deadline: '30th Sept', category: 'General' },
  { name: 'Reliance Foundation', provider: 'Reliance Foundation', amount: '₹2L (UG) / ₹6L (PG)', eligibility: 'Merit-cum-Means', max_amount: 600000, deadline: '14th Feb', category: 'General' },
  { name: 'Sitaram Jindal', provider: 'Sitaram Jindal Foundation', amount: '₹2,500 / month', eligibility: 'Merit-cum-Means', max_amount: 30000, deadline: 'Round the year', category: 'General' },
  { name: 'LIC Golden Jubilee', provider: 'LIC', amount: '₹20,000 / year', eligibility: 'Economically Weaker Section', max_amount: 20000, deadline: '31st Dec', category: 'General' },
  { name: 'Indian Oil Academic', provider: 'Indian Oil', amount: '₹1,000 / month', eligibility: '10+/ITI/Engg/MBBS', max_amount: 12000, deadline: '15th Nov', category: 'General' },
  { name: 'Dr. APJ Abdul Kalam', provider: 'Various NGOs', amount: '₹10,000', eligibility: 'Underprivileged Students', max_amount: 10000, deadline: 'Variable', category: 'General' },
  { name: 'G.P. Birla Scholarship', provider: 'G.P. Birla Educational Foundation', amount: '₹50,000 / year', eligibility: 'Merit in West Bengal', max_amount: 50000, deadline: '15th July', category: 'General' },
  { name: 'Swami Vivekananda (WB)', provider: 'Govt. of West Bengal', amount: '₹1,000 - ₹5,000 / month', eligibility: 'Merit-cum-Means (WB)', max_amount: 60000, deadline: 'Variable', category: 'General' },
  { name: 'Post Matric SC/ST', provider: 'State/Central Govt.', amount: 'Variable', eligibility: 'SC/ST Category', max_amount: 50000, deadline: '30th Nov', category: 'General' },
  { name: 'Central Sector Scheme', provider: 'Ministry of Education, Govt of India', amount: '₹10,000 / year', eligibility: 'Top 20th Percentile in Boards', max_amount: 10000, deadline: '31st Oct', category: 'General' },
]

function generateId() {
  return randomBytes(16).toString('hex')
}

export async function seedPhase3() {
  console.log('🌱 Seeding Phase 3 data (Colleges & Scholarships)...')

  // Drop tables to trigger schema update (since migration is handled by initDatabase)
  await execute('DROP TABLE IF EXISTS colleges')
  await execute('DROP TABLE IF EXISTS scholarships')
  
  // Re-init to create table with new columns
  await initDatabase()

  // Clear scholarships (schema unchanged)
  await execute('DELETE FROM scholarships')

  // Insert Colleges
  const insertCollegeSql = `
    INSERT INTO colleges (id, name, location, rating, fees_range, placement_avg, website, image, career_category, admission_process)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  for (const c of colleges) {
    await execute(insertCollegeSql, [
      generateId(),
      c.name,
      c.location,
      c.rating,
      c.fees_range,
      c.placement_avg,
      c.website,
      c.image,
      c.career_category,
      c.admission_process,
    ])
  }

  // Insert Scholarships
  const insertScholarshipSql = `
    INSERT INTO scholarships (id, name, provider, amount, eligibility, deadline, category)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  for (const s of scholarships) {
    await execute(insertScholarshipSql, [
      generateId(),
      s.name,
      s.provider,
      s.amount,
      s.eligibility,
      s.deadline,
      s.category,
    ])
  }

  const collegeCount = (await queryAll<{ count: number }>('SELECT COUNT(*) as count FROM colleges'))[0]
  const scholarshipCount = (await queryAll<{ count: number }>('SELECT COUNT(*) as count FROM scholarships'))[0]

  console.log(`✅ Seeded ${collegeCount.count} colleges and ${scholarshipCount.count} scholarships`)
}

// Run if directly executed
if (require.main === module) {
  seedPhase3()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
