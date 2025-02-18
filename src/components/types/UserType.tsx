export default interface User {
  uid: string;
  name: string;
  email: string;
  password?: string;
  selectedCandidate: string;
  isAdmin: boolean;
}
