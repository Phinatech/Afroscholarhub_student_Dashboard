

export interface SignupPayload {
    email: string;
    password: string;
  }
  
export interface SignupResponse {
    [x: string]: any;
    data: {
      user: any;
      message: string;
    };
  }

export  interface User {
    // Define the properties of your User object here
    id: string;
    email: string;
  }

export interface DecodedUser {
    _id: string;
}

export interface AllScholarships {
  id: string;
  application_fee: number;
  application_link: string;
  country: string;
  course: string;
  description: string;
  expert: {
    first_name: string,
    last_name: string,
    languages: string[],
    rating: number,
    years_of_experience: number
  }
  creator: string;
  image?: string;
  scholarship_keywords: string[];
  status: string;
  title: string
}

export interface ScholarProfile {
  // data: [
  //   email: any
  // ];
  first_name: string
  last_name: string
  dob: string
  nationality: string
  gender: string
  academic_transcript: File | null
  academics_achievements: string
  career_goals: string
  current_education_level: string
  extra_curricular_activities: string
  field_of_study: string
  graduation_year: string
  institution_name: string
  preferred_languages: string[]
  preferred_scholarship_location: string
  preferred_study_field: string
  social_media_profiles: string[]
  special_circumstances: string
  specific_scholarship_requirement: string
  statement_of_purpose: string
  scholarship_type: string
  email?: string
  _id?: string
}