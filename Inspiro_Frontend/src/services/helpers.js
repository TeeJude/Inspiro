export function validatePassword(password, confirmPassword) {
  // Regular expression to match password format
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Check if password matches the format
//   if (!passwordRegex.test(password)) {
//     return false; // Password format is invalid
//   }

  // Check if password and confirm password fields match
  if (password !== confirmPassword) {
    return false; // Passwords do not match
  }

  return true; // Password is valid and matches confirm password
}

export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    // second: 'numeric' 
  };
  return date.toLocaleString('en-US', options);
}

export const categories =[
  'Business', "Communication", "Education", "Tourism", "Health", "Food", "Economy", "Governance"
];

export function getSubString(string, length=0)
{
  
  let sub=  string?.substring(0, length);
  if(string?.length > sub?.length){
    sub = sub?.concat('...')
  }
  return sub

}

export function getInitial(fullName)
{
  const initials = fullName.split(" ").map(word => word[0]).join("");
  return initials
}
