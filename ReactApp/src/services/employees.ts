// import axios from 'axios';
// import { EmployeeType } from '../types/employees.type';

// export const getEmployees = async (): Promise<EmployeeType[]> => {
//   const res = await axios(
//     `${
//       import.meta.env.VITE_WORDPRESS_URL
//     }/wp-json/wp/v2/employees?acf_format=standard&_fields=id,acf.name,acf.meeting_id&order=asc&orderby=id`
//   );
//   return res.data;
// };

import { EmployeeType } from '../types/employees.type';

export const getEmployees = (): Promise<EmployeeType[]> => {
  return Promise.resolve([
    {
      id: '1',
      acf: {
        name: 'John Doe',
        meeting_id: 'HzhspYpMZ2nTxuLy7',
      },
    }
  ]);
};