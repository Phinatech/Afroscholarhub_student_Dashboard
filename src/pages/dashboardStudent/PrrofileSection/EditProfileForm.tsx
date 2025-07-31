"use client"

import { 
          useState, 
        } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
// import { 
//           // Select, 
//           SelectContent, 
//           SelectItem, 
//           SelectTrigger, 
//           SelectValue 
//         } from "../../../components/ui/select"
import { Textarea } from "../../../components/ui/textarea"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { url } from "../../../utils/Api"
import Cookies from "js-cookie"
import { ScholarProfile } from "../../../types/Interface"
import { useDispatch } from "react-redux"
import { setProfile } from "../../../global/redux/ProfileSlice"
import { 
          Nationality, 
          // NationalityOptions 
        } from "./Nationality";



export function EditProfileForm({ scholarId }: { scholarId: string }) {
  
  const dispatch = useDispatch()

  type SocialPlatform = 'facebook' | 'linkedin' | 'twitter' | 'instagram';

  const platforms: SocialPlatform[] = ['facebook', 'linkedin', 'twitter', 'instagram'];

  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
  console.log("update-profile-access", accessToken)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [academicTranscript, setAcademicTranscript] = useState<File | null>(null);
  const [academicAchievements, setAcademicAchievements] = useState('');
  const [careerGoals, setCareerGoals] = useState('');
  const [currentEducationLevel, setCurrentEducationLevel] = useState('');
  const [extraCurricularActivities, setExtraCurricularActivities] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [preferredLanguages, setPreferredLanguages] = useState({
    universal: '',
    others: '',
  });
  const [preferredScholarshipLocation, setPreferredScholarshipLocation] = useState('');
  const [preferredStudyField, setPreferredStudyField] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    linkedin: '',
    twitter: '',
    instagram: ''
  });
  const [specialCircumstances, setSpecialCircumstances] = useState('');
  const [specialScholarshipRequirement, setSpecialScholarshipRequirement] = useState('');
  const [statementOfPurpose, setStatementOfPurpose] = useState('');
  const [scholarshipType, setScholarshipType] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setDob('');
    setNationality('');
    setGender('');
    setAcademicTranscript(null);
    setAcademicAchievements('')
    setCareerGoals('');
    setCurrentEducationLevel('');
    setExtraCurricularActivities('');
    setFieldOfStudy('');
    setGraduationYear('');
    setInstitutionName('');
    setPreferredLanguages({ universal: '', others: '' });
    setPreferredScholarshipLocation('');
    setPreferredStudyField('');
    setSocialLinks({ facebook: '', linkedin: '', twitter: '', instagram: '' });
    setSpecialCircumstances('');
    setSpecialScholarshipRequirement('');
    setStatementOfPurpose('');
    setScholarshipType('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true)

    const formData = new FormData();
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("dob", dob)
    formData.append("nationality", nationality)
    formData.append("gender", gender)

    if (academicTranscript) {
      formData.append("academic_transcript", academicTranscript);
    }

    formData.append("academics_achievements", academicAchievements)
    formData.append("career_goals", careerGoals)
    formData.append("current_education_level", currentEducationLevel)
    formData.append("extra_curricular_activities", extraCurricularActivities)
    formData.append("field_of_study", fieldOfStudy)
    formData.append("graduation_year", graduationYear)
    formData.append("institution_name", institutionName)

     // Spoken Languages
     const spokenLanguages = [preferredLanguages.universal, ...preferredLanguages.others.split(",")];
     spokenLanguages.forEach((lang, index) => {
       formData.append(`preferred_languages[${index}]`, lang.trim());
     });

    //  const spokenLanguages = [preferredLanguages.universal, ...(preferredLanguages.others ? preferredLanguages.others.split(",") : [])];


    formData.append("preferred_scholarship_location", preferredScholarshipLocation)
    formData.append("preferred_study_field", preferredStudyField)

    // social media
    Object.values(socialLinks).forEach((value) => {
      if (value) {
          formData.append("social_media_profiles[]", value); 
      }
    });

    formData.append("special_circumstances", specialCircumstances)
    formData.append("specific_scholarship_requirement", specialScholarshipRequirement)
    formData.append("statement_of_purpose", statementOfPurpose)
    formData.append("scholarship_type", scholarshipType)

    const formDataObject: Record<string, any> = {};
      formData.forEach((value, key) => {
      if (!formDataObject[key]) {
        formDataObject[key] = value;
      } else {
        formDataObject[key] = Array.isArray(formDataObject[key])
          ? [...formDataObject[key], value]
          : [formDataObject[key], value];
      }
    });

  console.log("Form Data Before Sending:", formDataObject);

    try{
      const response = await axios.patch(`${url}/scholar/profile/${scholarId}`, 
        formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        console.log("form-response", response)

        if (response.status === 200) {
          const updatedProfile: ScholarProfile = response.data;

          console.log("new-profile-scholar", updatedProfile)
          dispatch(setProfile(updatedProfile));

          console.log("pro-data", response)

          toast.success("Profile updated successfully!");
          resetForm()
        } else {
          console.log("in-error", response)
          toast.error("Error updating profile. Please, try again...")
        }
    } catch (error: any) {
      console.error("error", error)
      toast.error("An error occured while updating your profile.")
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="max-h-[80vh] w-[90% overflow-x-hidden p-4">
      <form name="scholarProfileForm" className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name" 
                className="w-full"
                required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scholarship_type">Type of Scholarship</Label>
            <Input
              value={scholarshipType}
              onChange={(e) => setScholarshipType(e.target.value)}
              placeholder="i.e. Full, Partial, Research etc"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specific_scholarship_requirement">Specific Requirements</Label>
            <Input
              value={specialScholarshipRequirement}
              onChange={(e) => setSpecialScholarshipRequirement(e.target.value)}
              placeholder="i.e. Financial, Academic etc"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <select
               className="border-[#ececeb] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] h-[40px] px-[6px] w-ful outline-none"
               value={nationality}
               onChange={(e) => setNationality(e.target.value)}
                required
              >
              <option value="" disabled selected>
                   Select Nationality
              </option>
              {Nationality.map((country) => (
                <option key={country} value={country}>
                    {country}
                  </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred_scholarship_location">Preferred Location</Label>
            {/* <Input
              id="preferred_scholarship_location"
              name="preferred_scholarship_location"
              value={profile.preferred_scholarship_location}
              onChange={handleChange}
              placeholder="Country" 
              required
            /> */}
            <select
               className="border-[#8487ececeb7d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] h-[40px] px-[6px] w-ful outline-none"
               value={preferredScholarshipLocation}
               onChange={(e) => setPreferredScholarshipLocation(e.target.value)}
                required
              >
              <option value="" disabled selected>
                   Select Preferred Location
              </option>
              {Nationality.map((countries) => (
                <option key={countries} value={countries}>
                    {countries}
                  </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred_study_field">Preferred Field of Study</Label>
            <Input
              value={preferredStudyField}
              onChange={(e) => setPreferredStudyField(e.target.value)}
              placeholder="i.e STEM, Arts, Humanities etc"
              className="w-full"
            />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="preferred_languages">Preferred Languages</Label>
            <Input
              id="preferred_languages"
              name="preferred_languages"
              value={profile.preferred_languages.join(", ")}
              onChange={(e) => handleArrayChange(e, "preferred_languages")}
              placeholder="e.g. Chinese, English (comma-separated)"
              required
            />
          </div> */}

          
          <div className="w-full md:w-[48% flex flex-col gap-2">
            <p className="text-[14px] font-bold">Language(s) Spoken</p>
              <div className="w-full flex flex-wrap justify-between gap-2">
                 <input type="text" className="h-[40px] w-full md:w-[48% border-[#ececeb] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] pl-[6px] outline-none" placeholder="Universal (English, French etc.)" 
                  value={preferredLanguages.universal}
                  onChange={(e) => setPreferredLanguages({ ...preferredLanguages, universal: e.target.value })}
                  />

                  <input type="text" className="h-[40px] w-full md:w-[48% border-[#ececeb] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] pl-[6px] outline-none" placeholder="Others (If more than one, seperate with a comma)"
                  value={preferredLanguages.others}
                  onChange={(e) => setPreferredLanguages({ ...preferredLanguages, others: e.target.value })} 
                  />
              </div>
          </div>

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="gender">Gender</Label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border-[#ececeb] border-[1px] h-[40px] rounded-[6px] text-[13px]"
              required
            >
              {/* <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent> */}
                <option value="" disabled>Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Others</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_circumstances">Special Circumstances</Label>
            <Input
              value={specialCircumstances}
              onChange={(e) => setSpecialCircumstances(e.target.value)}
              placeholder="i.e. Disability, Financial Aids, Unique Challenges Faced"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input type="date" name="dob" 
              value={dob}
              onChange={(e) => setDob(e.target.value)} className="w-full" required /> 
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_education_level">Current Education Level</Label>
            <Input
              value={currentEducationLevel}
              onChange={(e) => setCurrentEducationLevel(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="extra_curricular_activities">Extra-curricular Activities</Label>
            <Input
              value={extraCurricularActivities}
              onChange={(e) => setExtraCurricularActivities(e.target.value)}
              placeholder="i.e. club, volunteer works etc."
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field_of_study">Field of Study/Major</Label>
            <Input 
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)} 
              className="w-full"
              />
          </div>

          <div className="space-y-2">
            <Label htmlFor="academics_achievements">Academic Achievements</Label>
            <Input
              value={academicAchievements}
              onChange={(e) => setAcademicAchievements(e.target.value)}
              placeholder="i.e. CGPA"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="statement_of_purpose">Statement of Purpose</Label>
            <Input
              value={statementOfPurpose}
              onChange={(e) => setStatementOfPurpose(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="graduation_year">Graduation Year (or expected)</Label>
            <Input
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="academic_transcript">Academic Transcript</Label>
            <Input
              // id="academic_transcript"
              // name="academic_transcript"
              type="file"
              onChange={(e: any) => setAcademicTranscript(e.target.files[0] || null)}
              accept=".pdf,.png.jpg,.jpeg,.PNG,.JPEG,.JPG,.doc,.zip,.ZIP"
              className="w-full"
            />
          </div>
          <div className="space-y-2 col-span-full">
            <Label htmlFor="career_goals">Career Goals</Label>
            <Textarea
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              placeholder="Describe your career goals..."
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="institution_name">Institution Name</Label>
            <Input
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              placeholder="Current or last attended institution"
              className="w-full"
            />
          </div>

          {/* <div className="space-y-2 col-span-full">
            <Label htmlFor="social_media_profiles">Social Media Profiles</Label>
            <Input
              id="social_media_profiles"
              name="social_media_profiles"
              value={profile.social_media_profiles.join(", ")}
              onChange={(e) => handleArrayChange(e, "social_media_profiles")}
              placeholder="e.g. facebook, linkedIn (comma-separated)"
            />
          </div> */}

          
          <div className="w-full md:w-[48% flex flex-col gap-2">
              <p className="text-[14px] font-bold">Social Media Profile Links</p>
              <div className="w-full flex flex-wrap justify-between gap-2">
                {platforms.map((platform) => (
                  <input
                    key={platform}
                    type="text"
                    placeholder={platform.charAt(0).toUpperCase() + platform.slice(1)}
                    value={socialLinks[platform]}
                    onChange={(e) => setSocialLinks({ ...socialLinks, [platform]: e.target.value })}
                    className="h-[40px] w-full md:w-[48%] border-[#ececeb] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] pl-[6px] outline-none "
                    />
                  ))}
               </div>
          </div>

        </div>
        <Button type="submit" className={`w-full border-[1px] border-[#000] bg-primary text-primary-foreground  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
          {isSubmitting ? "Updating..." : "Submit"}
        </Button>
      </form>
      <ToastContainer />
    </div>
  )
}

