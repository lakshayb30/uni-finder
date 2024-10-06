import { useState } from 'react';
import { universities } from './index';
import {useRouter} from 'next/router';

export default function Apply() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        university: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can integrate Firebase Firestore to store the form data.
        console.log('Form submitted:', formData);
    };

    const returnback = () => {
            router.push('/');
        }

    return (
        <div>
        <h1>Submit Your Application</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <label htmlFor="university-select">Select University:</label>
            <select
            id="university-select"
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            >
            <option value="">Select University</option>
            {universities ? universities.map((university) => (
                <option key={university.id} value={university.id}>
                    {university.name}
                </option>
            )) : null}
            </select>
            <button type="submit">Submit Application</button>
            <button onClick={returnback}>Cancel</button>
        </form>
        </div>
    );
    }
