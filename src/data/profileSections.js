// File: src/data/profileSections.js
import { PrIconOne } from "../../assets/svgs/Icon1";
import { PrIconTwo } from "../../assets/svgs/Icon2";
import { PrIconThree } from "../../assets/svgs/Icon3";
import { PrIconFour } from "../../assets/svgs/Icon4";
import { PrIconFive } from "../../assets/svgs/Icon5";
import { PrIconSix } from "../../assets/svgs/Icon6";
import {
  basicDetailsFields,
  careerDetailsFields,
  faithFields,
  familyDetailsFields,
  genericDetailsFields,
  preferenceFields,
} from "./formData";

// Basic Details Fields

// Profile Sections
const profileSections = [
  {
    id: 1,
    title: "Basic details",
    subtitle: "Name, gender, Date of birth etc",
    icon: <PrIconOne />,
    fields: basicDetailsFields,
  },
  {
    id: 2,
    title: "Generic details",
    subtitle: "Ethnicity, complexion, marital status etc",
    icon: <PrIconTwo />,
    fields: genericDetailsFields,
  },
  {
    id: 3,
    title: "Faith",
    subtitle: "Religion, Pray, Clothing etc.",
    icon: <PrIconThree />,
    fields: faithFields,
  },
  {
    id: 4,
    title: "Career details",
    subtitle: "Education, occupation etc",
    icon: <PrIconFour />,
    fields: careerDetailsFields,
  },
  {
    id: 5,
    title: "Family details",
    subtitle: "Parents, siblings etc",
    icon: <PrIconFive />,
    fields: familyDetailsFields,
  },
  {
    id: 6,
    title: "Preference",
    subtitle: "Describe your partner preference",
    icon: <PrIconSix />,
    fields: preferenceFields,
  },
];

export default profileSections;
