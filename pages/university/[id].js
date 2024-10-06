import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
const universities = [
  { id: 1, name: 'University of Oxford', location: 'Oxford, UK', courses: ['Computer Science', 'Engineering'] },
  { id: 2, name: 'Harvard University', location: 'Cambridge, USA', courses: ['Law', 'Business'] },
  { id: 3, name: 'Stanford University', location: 'Stanford, USA', courses: ['Computer Science', 'Medicine'] },
  { id: 4, name: 'Massachusetts Institute of Technology (MIT)', location: 'Cambridge, USA', courses: ['Engineering', 'Physics'] },
  { id: 5, name: 'University of Cambridge', location: 'Cambridge, UK', courses: ['Mathematics', 'Economics'] },
  { id: 6, name: 'National University of Singapore (NUS)', location: 'Singapore', courses: ['Computer Science', 'Architecture'] },
  { id: 7, name: 'University of Tokyo', location: 'Tokyo, Japan', courses: ['Mechanical Engineering', 'Chemistry'] },
  { id: 8, name: 'ETH Zurich', location: 'Zurich, Switzerland', courses: ['Engineering', 'Environmental Science'] },
  { id: 9, name: 'University of Melbourne', location: 'Melbourne, Australia', courses: ['Law', 'Medicine'] },
  { id: 10, name: 'Indian Institute of Technology (IIT) Bombay', location: 'Maharashtra, India', courses: ['Engineering', 'Physics'] },
  { id: 11, name: 'California Institute of Technology (Caltech)', location: 'Pasadena, USA', courses: ['Physics', 'Astronomy'] },
  { id: 12, name: 'University of Chicago', location: 'Chicago, USA', courses: ['Economics', 'Law'] },
  { id: 13, name: 'Tsinghua University', location: 'Beijing, China', courses: ['Computer Science', 'Engineering'] },
  { id: 14, name: 'Peking University', location: 'Beijing, China', courses: ['Business', 'Law'] },
  { id: 15, name: 'University of Toronto', location: 'Toronto, Canada', courses: ['Medicine', 'Business'] },
  { id: 16, name: 'University of Edinburgh', location: 'Edinburgh, UK', courses: ['History', 'Physics'] },
  { id: 17, name: 'University of British Columbia', location: 'Vancouver, Canada', courses: ['Environmental Science', 'Computer Science'] },
  { id: 18, name: 'Seoul National University', location: 'Seoul, South Korea', courses: ['Engineering', 'Medicine'] },
  { id: 19, name: 'Korea Advanced Institute of Science and Technology (KAIST)', location: 'Daejeon, South Korea', courses: ['Robotics', 'Physics'] },
  { id: 20, name: 'University of Hong Kong (HKU)', location: 'Hong Kong, China', courses: ['Business', 'Law'] },
  { id: 21, name: 'Yale University', location: 'New Haven, USA', courses: ['Law', 'Political Science'] },
  { id: 22, name: 'Princeton University', location: 'Princeton, USA', courses: ['Physics', 'History'] },
  { id: 23, name: 'University of California, Berkeley (UC Berkeley)', location: 'Berkeley, USA', courses: ['Computer Science', 'Environmental Science'] },
  { id: 24, name: 'University of Sydney', location: 'Sydney, Australia', courses: ['Medicine', 'Law'] },
  { id: 25, name: 'University of Queensland', location: 'Brisbane, Australia', courses: ['Business', 'Biology'] },
  { id: 26, name: 'University of Manchester', location: 'Manchester, UK', courses: ['Engineering', 'Physics'] },
  { id: 27, name: 'Sorbonne University', location: 'Paris, France', courses: ['Philosophy', 'Literature'] },
  { id: 28, name: 'University of Copenhagen', location: 'Copenhagen, Denmark', courses: ['Biology', 'Physics'] },
  { id: 29, name: 'Technical University of Munich (TUM)', location: 'Munich, Germany', courses: ['Engineering', 'Computer Science'] },
  { id: 30, name: 'Leiden University', location: 'Leiden, Netherlands', courses: ['Law', 'Medicine'] },
  { id: 31, name: 'Utrecht University', location: 'Utrecht, Netherlands', courses: ['Philosophy', 'Geosciences'] },
  { id: 32, name: 'University of Auckland', location: 'Auckland, New Zealand', courses: ['Engineering', 'Law'] },
  { id: 33, name: 'Monash University', location: 'Melbourne, Australia', courses: ['Medicine', 'Pharmacy'] },
  { id: 34, name: 'Australian National University (ANU)', location: 'Canberra, Australia', courses: ['Politics', 'Astronomy'] },
  { id: 35, name: 'Ludwig Maximilian University of Munich (LMU)', location: 'Munich, Germany', courses: ['Physics', 'Law'] },
  { id: 36, name: 'University of Helsinki', location: 'Helsinki, Finland', courses: ['Mathematics', 'Computer Science'] },
  { id: 37, name: 'University of Warwick', location: 'Coventry, UK', courses: ['Business', 'Engineering'] },
  { id: 38, name: 'University of Glasgow', location: 'Glasgow, UK', courses: ['Law', 'Medicine'] },
  { id: 39, name: 'University of Zurich', location: 'Zurich, Switzerland', courses: ['Economics', 'Philosophy'] },
  { id: 40, name: 'Kyoto University', location: 'Kyoto, Japan', courses: ['Engineering', 'Mathematics'] },
  { id: 41, name: 'Nanyang Technological University (NTU)', location: 'Singapore', courses: ['Mechanical Engineering', 'Business'] },
  { id: 42, name: 'University of New South Wales (UNSW)', location: 'Sydney, Australia', courses: ['Engineering', 'Medicine'] },
  { id: 43, name: 'Kings College London', location: 'London, UK', courses: ['Law', 'Nursing'] },
  { id: 44, name: 'Ecole Polytechnique Fédérale de Lausanne (EPFL)', location: 'Lausanne, Switzerland', courses: ['Engineering', 'Physics'] },
  { id: 45, name: 'Carnegie Mellon University', location: 'Pittsburgh, USA', courses: ['Robotics', 'Computer Science'] },
  { id: 46, name: 'Duke University', location: 'Durham, USA', courses: ['Medicine', 'Business'] },
  { id: 47, name: 'London School of Economics and Political Science (LSE)', location: 'London, UK', courses: ['Economics', 'Political Science'] },
  { id: 48, name: 'University of Illinois Urbana-Champaign', location: 'Champaign, USA', courses: ['Engineering', 'Agriculture'] },
  { id: 49, name: 'Johns Hopkins University', location: 'Baltimore, USA', courses: ['Medicine', 'Public Health'] },
  { id: 50, name: 'University of Southern California (USC)', location: 'Los Angeles, USA', courses: ['Film', 'Business'] },
  { id: 51, name: 'McGill University', location: 'Montreal, Canada', courses: ['Law', 'Medicine'] },
  { id: 52, name: 'University of Washington', location: 'Seattle, USA', courses: ['Computer Science', 'Environmental Science'] },
  { id: 53, name: 'University of Pennsylvania', location: 'Philadelphia, USA', courses: ['Business', 'Nursing'] },
  { id: 54, name: 'Georgetown University', location: 'Washington D.C., USA', courses: ['Law', 'International Relations'] },
  { id: 55, name: 'University of California, Los Angeles (UCLA)', location: 'Los Angeles, USA', courses: ['Film', 'Psychology'] },
  { id: 56, name: 'University of Wisconsin-Madison', location: 'Madison, USA', courses: ['Engineering', 'Economics'] },
  { id: 57, name: 'University of Texas at Austin', location: 'Austin, USA', courses: ['Engineering', 'Business'] },
  { id: 58, name: 'New York University (NYU)', location: 'New York, USA', courses: ['Film', 'Business'] },
  { id: 59, name: 'University of Amsterdam', location: 'Amsterdam, Netherlands', courses: ['Social Sciences', 'Law'] },
  { id: 60, name: 'University of California, San Diego (UCSD)', location: 'San Diego, USA', courses: ['Biology', 'Oceanography'] },
  { id: 61, name: 'Fudan University', location: 'Shanghai, China', courses: ['Medicine', 'Business'] },
  { id: 62, name: 'University of California, Davis', location: 'Davis, USA', courses: ['Agriculture', 'Veterinary Medicine'] },
  { id: 63, name: 'Osaka University', location: 'Osaka, Japan', courses: ['Engineering', 'Medicine'] },
  { id: 64, name: 'Ecole Normale Supérieure, Paris', location: 'Paris, France', courses: ['Philosophy', 'Physics'] },
  { id: 65, name: 'Sciences Po', location: 'Paris, France', courses: ['Political Science', 'International Relations'] },
  { id: 66, name: 'Universiti Malaya (UM)', location: 'Kuala Lumpur, Malaysia', courses: ['Engineering', 'Law'] },
  { id: 67, name: 'Durham University', location: 'Durham, UK', courses: ['History', 'Law'] },
  { id: 68, name: 'University of Birmingham', location: 'Birmingham, UK', courses: ['Engineering', 'Law'] },
  { id: 69, name: 'University of St Andrews', location: 'St Andrews, UK', courses: ['Philosophy', 'Economics'] },
  { id: 70, name: 'University of Adelaide', location: 'Adelaide, Australia', courses: ['Medicine', 'Dentistry'] },
  { id: 71, name: 'University of Liverpool', location: 'Liverpool, UK', courses: ['Veterinary Science', 'Law'] },
  { id: 72, name: 'University of Leeds', location: 'Leeds, UK', courses: ['Business', 'Engineering'] },
  { id: 73, name: 'Boston University', location: 'Boston, USA', courses: ['Law', 'Business'] },
  { id: 74, name: 'Ohio State University', location: 'Columbus, USA', courses: ['Business', 'Engineering'] },
  { id: 75, name: 'Michigan State University', location: 'East Lansing, USA', courses: ['Agriculture', 'Business'] },
  { id: 76, name: 'University of Minnesota', location: 'Minneapolis, USA', courses: ['Engineering', 'Public Health'] },
  { id: 77, name: 'University of North Carolina at Chapel Hill', location: 'Chapel Hill, USA', courses: ['Business', 'Nursing'] },
  { id: 78, name: 'University of Florida', location: 'Gainesville, USA', courses: ['Engineering', 'Law'] },
  { id: 79, name: 'University of Notre Dame', location: 'Notre Dame, USA', courses: ['Business', 'Political Science'] },
  { id: 80, name: 'Purdue University', location: 'West Lafayette, USA', courses: ['Engineering', 'Agriculture'] },
  { id: 81, name: 'University of Glasgow', location: 'Glasgow, UK', courses: ['Medicine', 'Veterinary Medicine'] },
  { id: 82, name: 'University of Exeter', location: 'Exeter, UK', courses: ['Business', 'Psychology'] },
  { id: 83, name: 'University of Reading', location: 'Reading, UK', courses: ['Agriculture', 'Business'] },
  { id: 84, name: 'University of Sheffield', location: 'Sheffield, UK', courses: ['Engineering', 'Law'] },
  { id: 85, name: 'Trinity College Dublin', location: 'Dublin, Ireland', courses: ['Literature', 'Law'] },
  { id: 86, name: 'National Taiwan University (NTU)', location: 'Taipei, Taiwan', courses: ['Engineering', 'Medicine'] },
  { id: 87, name: 'University of Oslo', location: 'Oslo, Norway', courses: ['Law', 'Physics'] },
  { id: 88, name: 'University of Western Australia', location: 'Perth, Australia', courses: ['Law', 'Engineering'] },
  { id: 89, name: 'University of Arizona', location: 'Tucson, USA', courses: ['Astronomy', 'Geosciences'] },
  { id: 90, name: 'University of Virginia', location: 'Charlottesville, USA', courses: ['Law', 'History'] },
  { id: 91, name: 'Washington University in St. Louis', location: 'St. Louis, USA', courses: ['Medicine', 'Business'] },
  { id: 92, name: 'University of Pittsburgh', location: 'Pittsburgh, USA', courses: ['Public Health', 'Engineering'] },
  { id: 93, name: 'Rice University', location: 'Houston, USA', courses: ['Engineering', 'Physics'] },
  { id: 94, name: 'Brown University', location: 'Providence, USA', courses: ['Literature', 'Political Science'] },
  { id: 95, name: 'University of Basel', location: 'Basel, Switzerland', courses: ['Biology', 'History'] },
  { id: 96, name: 'University of Vienna', location: 'Vienna, Austria', courses: ['Law', 'Philosophy'] },
  { id: 97, name: 'University of São Paulo', location: 'São Paulo, Brazil', courses: ['Medicine', 'Engineering'] },
  { id: 98, name: 'Pontifical Catholic University of Chile', location: 'Santiago, Chile', courses: ['Business', 'Law'] },
  { id: 99, name: 'University of Cape Town', location: 'Cape Town, South Africa', courses: ['Law', 'Economics'] },
  { id: 100, name: 'Aarhus University', location: 'Aarhus, Denmark', courses: ['Business', 'Political Science'] },
  { id: 101, name: 'University of Delhi', location: 'New Delhi, India', courses: ['Arts', 'Science', 'Commerce', 'Law', 'Engineering'] },
  { id: 102, name: 'Indian Institute of Technology Delhi (IIT Delhi)', location: 'New Delhi, India', courses: ['Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'] },
  { id: 103, name: 'Jawaharlal Nehru University (JNU)', location: 'New Delhi, India', courses: ['International Relations', 'Political Science', 'Linguistics', 'Environmental Sciences'] },
  { id: 104, name: 'Jamia Millia Islamia', location: 'New Delhi, India', courses: ['Mass Communication', 'Engineering', 'Social Sciences', 'Law'] },
  { id: 105, name: 'Indira Gandhi National Open University (IGNOU)', location: 'New Delhi, India', courses: ['Distance Education', 'Management', 'Arts', 'Commerce'] },
  { id: 106, name: 'Sri Venkateswara College', location: 'New Delhi, India', courses: ['Biochemistry', 'Chemistry', 'Economics', 'Commerce'] },
  { id: 107, name: 'St. Stephen’s College', location: 'New Delhi, India', courses: ['Economics', 'History', 'English Literature', 'Physics'] },
  { id: 108, name: 'Hansraj College', location: 'New Delhi, India', courses: ['Commerce', 'English', 'Mathematics', 'Botany'] },
  { id: 109, name: 'Lady Shri Ram College for Women', location: 'New Delhi, India', courses: ['Psychology', 'Economics', 'Political Science', 'Journalism'] },
  { id: 110, name: 'Miranda House', location: 'New Delhi, India', courses: ['Chemistry', 'Physics', 'English', 'History'] },
  { id: 111, name: 'Delhi College of Arts and Commerce (DCAC)', location: 'New Delhi, India', courses: ['Journalism', 'Political Science', 'Economics', 'Commerce'] },
  { id: 112, name: 'Ramjas College', location: 'New Delhi, India', courses: ['Botany', 'Economics', 'Political Science', 'Commerce'] },
  { id: 113, name: 'Shri Ram College of Commerce (SRCC)', location: 'New Delhi, India', courses: ['Economics', 'Commerce', 'Management'] },
  { id: 114, name: 'Daulat Ram College', location: 'New Delhi, India', courses: ['English', 'History', 'Botany', 'Political Science'] },
  { id: 115, name: 'Kirori Mal College', location: 'New Delhi, India', courses: ['Chemistry', 'Political Science', 'Economics', 'English'] },
  { id: 116, name: 'Jesus and Mary College (JMC)', location: 'New Delhi, India', courses: ['English', 'Political Science', 'Commerce', 'Economics'] },
  { id: 117, name: 'Maitreyi College', location: 'New Delhi, India', courses: ['Biology', 'English', 'Sociology', 'Mathematics'] },
  { id: 118, name: 'Zakir Husain Delhi College', location: 'New Delhi, India', courses: ['History', 'Political Science', 'Mathematics', 'Physics'] },
  { id: 119, name: 'Shaheed Bhagat Singh College', location: 'New Delhi, India', courses: ['Commerce', 'Political Science', 'History', 'Economics'] },
  { id: 120, name: 'Gargi College', location: 'New Delhi, India', courses: ['Chemistry', 'Microbiology', 'Economics', 'Political Science'] },
  { id: 121, name: 'Acharya Narendra Dev College', location: 'New Delhi, India', courses: ['Chemistry', 'Mathematics', 'Computer Science', 'Biological Sciences'] },
  { id: 122, name: 'Bhaskaracharya College of Applied Sciences', location: 'New Delhi, India', courses: ['Computer Science', 'Electronics', 'Biomedical Sciences', 'Microbiology'] },
  { id: 123, name: 'Indraprastha College for Women', location: 'New Delhi, India', courses: ['Economics', 'Computer Science', 'Political Science', 'Psychology'] },
  { id: 124, name: 'Atma Ram Sanatan Dharma College', location: 'New Delhi, India', courses: ['Political Science', 'History', 'Chemistry', 'Physics'] },
  { id: 125, name: 'Delhi Technological University (DTU)', location: 'New Delhi, India', courses: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'] },
  { id: 126, name: 'Netaji Subhas University of Technology (NSUT)', location: 'New Delhi, India', courses: ['Computer Science', 'Mechanical Engineering', 'Electronics', 'Information Technology'] },
  { id: 127, name: 'National Institute of Fashion Technology (NIFT) Delhi', location: 'New Delhi, India', courses: ['Fashion Design', 'Textile Design', 'Fashion Communication'] },
  { id: 128, name: 'Maharaja Agrasen College', location: 'New Delhi, India', courses: ['Political Science', 'Electronics', 'Journalism', 'Commerce'] },
  { id: 129, name: 'College of Vocational Studies', location: 'New Delhi, India', courses: ['Tourism', 'Marketing Management', 'Commerce', 'History'] },
  { id: 130, name: 'Shaheed Sukhdev College of Business Studies', location: 'New Delhi, India', courses: ['Business Studies', 'Finance', 'Marketing', 'Entrepreneurship'] },
  { id: 131, name: 'Vivekananda College', location: 'New Delhi, India', courses: ['History', 'Political Science', 'English', 'Botany'] },
  { id: 132, name: 'Lakshmibai College', location: 'New Delhi, India', courses: ['Political Science', 'Economics', 'Commerce', 'Mathematics'] },
  { id: 133, name: 'Shivaji College', location: 'New Delhi, India', courses: ['Mathematics', 'Physics', 'History', 'Political Science'] },
  { id: 134, name: 'PGDAV College', location: 'New Delhi, India', courses: ['Commerce', 'Economics', 'Political Science', 'History'] },
  { id: 135, name: 'Kalindi College', location: 'New Delhi, India', courses: ['Political Science', 'Commerce', 'Mathematics', 'Journalism'] },
  { id: 136, name: 'Shyama Prasad Mukherji College for Women', location: 'New Delhi, India', courses: ['Commerce', 'Political Science', 'Mathematics', 'Psychology'] },
  { id: 137, name: 'Bhagini Nivedita College', location: 'New Delhi, India', courses: ['Commerce', 'English', 'Political Science', 'Mathematics'] },
  { id: 138, name: 'Aditi Mahavidyalaya', location: 'New Delhi, India', courses: ['Commerce', 'Geography', 'Political Science', 'Social Work'] },
  { id: 139, name: 'Aryabhatta College', location: 'New Delhi, India', courses: ['Political Science', 'History', 'Commerce', 'Economics'] },
  { id: 140, name: 'Keshav Mahavidyalaya', location: 'New Delhi, India', courses: ['Computer Science', 'Commerce', 'Mathematics', 'Psychology'] },
  { id: 141, name: 'Ramanujan College', location: 'New Delhi, India', courses: ['Commerce', 'Political Science', 'Computer Science', 'Economics'] },
  { id: 142, name: 'Motilal Nehru College', location: 'New Delhi, India', courses: ['Commerce', 'Political Science', 'History', 'Mathematics'] },
  { id: 143, name: 'Bhaskraycharya College of Applied Sciences', location: 'New Delhi, India', courses: ['Computer Science', 'Electronics', 'Biotechnology', 'Biochemistry'] },
  { id: 144, name: 'Sri Guru Gobind Singh College of Commerce', location: 'New Delhi, India', courses: ['Commerce', 'Economics', 'Computer Science', 'Management'] },
  { id: 145, name: 'Deen Dayal Upadhyaya College', location: 'New Delhi, India', courses: ['Botany', 'Zoology', 'Commerce', 'Physics'] },
  { id: 146, name: 'Institute of Home Economics', location: 'New Delhi, India', courses: ['Home Science', 'Nutrition', 'Biochemistry', 'Textile Design'] },
  { id: 147, name: 'Bhim Rao Ambedkar College', location: 'New Delhi, India', courses: ['Social Work', 'Political Science',]}
];
export default function UniversityDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [university, setUniversity] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleSearch = () => {
    let filteredResults = [];
    if(search || location || Course){
        filteredResults = universities.filter(university =>
            university.name.toLowerCase().includes(search.toLowerCase()) &&
            university.location.toLowerCase().includes(location.toLowerCase()) &&
            university.courses.some(course => course.toLowerCase().includes(Course.toLowerCase()))
        );
    if(filteredResults.length === 0){
        setMessage('No results found.');
        return;
    }}else{
        alert("Please enter a search term.");
        return;
    } 
    setResults(filteredResults);
};
  const handleApplication = () => {
    router.push('/apply');
  }
  useEffect(() => {
    if (id) {
      const uni = universities.find(u => u.id == id);
      setUniversity(uni);
    }
  }, [id]);
  useEffect(() => {
    if (typeof window !== 'undefined' && university) {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      const bookmarked = savedBookmarks.some(bookmark => bookmark.id === university.id);
      setIsBookmarked(bookmarked);
    }
  }, [university]);
  const handleBookmark = () => {
    if (typeof window !== 'undefined' && university) {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      const bookmarkExists = savedBookmarks.some(bookmark => bookmark.id === university.id);
      let updatedBookmarks;
      if (bookmarkExists) {
        updatedBookmarks = savedBookmarks.filter(bookmark => bookmark.id !== university.id);
        setIsBookmarked(false);
      } else {
        updatedBookmarks = [...savedBookmarks, university];
        setIsBookmarked(true);
      }
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
  };
  if (!university) return <p>Loading...</p>;
  return (
    <div style={{fontFamily:'arial, sans-serif'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid black'}}>
                <div style={{paddingLeft:'5%',}}>
                    <a href='/' style={{textDecoration:'none',color:'black'}}><h1>UniFinder</h1></a>   
                </div>
                <div style={{display:'flex',paddingRight:'10%'}}>
                    <img src='/images/bookmark.png' alt='Bookmark' onClick = {handleBookmark} style={{width:'2vw',cursor:"pointer",marginRight:'20%'}}/>
                    <img src='/images/apply.png' alt='apply' onClick = {handleApplication} style={{cursor:"pointer",width:'2vw',marginRight:'20%'}}/>
                    {session && (<img src='/images/logout.png' alt='logout' onClick={() => signOut()} style={{cursor:"pointer",width:'2vw',marginRight:'20%'}}/>)}
                    {!session && (<img src='/images/login.png' alt='login' onClick={() => signIn()} style={{cursor:"pointer",width:'2vw',marginRight:'20%'}}/>)}
                </div>
      </div>
      <h1>{university.name}</h1>
      <p>{university.location}</p>
      <h2>Courses Offered</h2>
      <ul>
        {university.courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
      <button onClick={handleBookmark}>
        {isBookmarked ? 'Remove Bookmark' : 'Bookmark this University'}
      </button>
    </div>
  );
}
