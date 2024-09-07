// pages/university/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
  { id: 10, name: 'Indian Institute of Technology (IIT) Delhi', location: 'Delhi, India', courses: ['Engineering', 'Physics'] },
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
  { id: 100, name: 'Aarhus University', location: 'Aarhus, Denmark', courses: ['Business', 'Political Science'] }
]


export default function UniversityDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [university, setUniversity] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Fetch the university data based on the ID
  useEffect(() => {
    if (id) {
      const uni = universities.find(u => u.id == id);
      setUniversity(uni);
    }
  }, [id]);

  // Check if the university is already bookmarked
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
        // Remove bookmark
        updatedBookmarks = savedBookmarks.filter(bookmark => bookmark.id !== university.id);
        setIsBookmarked(false);
      } else {
        // Add bookmark
        updatedBookmarks = [...savedBookmarks, university];
        setIsBookmarked(true);
      }

      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
  };

  if (!university) return <p>Loading...</p>;

  return (
    <div>
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
