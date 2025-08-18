import { form_constants } from '../utils/constants';

type FormDataType = {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    cv: string;
    message: string;
};

export const applyToCareers = async (url: string, data: FormDataType) => {
    const headers = {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        Connection: 'keep-alive',
        'Content-Type': 'application/json', // Updated to JSON format
        Referer: '/#/careers',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-GPC': '1',
        'X-Requested-With': 'XMLHttpRequest',
        // Cookie:
        //   'wordpress_cd9b744c619529c4988e0e94344eaf12=mmedhat%7C1742986795%7CJvttaVnOevXTKqtgdF7wuDfAsFwOmVRnnZnWrpJgHIw%7Ca5e2e3237600489ad5d996bd7e2e8c92062b7cb43a656f45c797484eeb22688d; wpforms_fields_group_settings_advanced=true; adminer_key=191df2ec9d0907f21297791293c33fd9; adminer_sid=tak3a13qiamk7rihu2t3vrs0le; PGADMIN_LANGUAGE=en; session=.eJwlzkFqQzEMBNC7eN2FJVuynMt8JFuipaGB_5NVyd0r6HIG3jC_5YjTr89ye54v_yjH1y63snY160ishj5QGYI7N3VsAG2BDug8aECTjtuyYm8szLOtRYB9KgFr0NQVBizTIAW5W4RNoupdQKu1xkoxc3-Ecc-1vi1qySOvy8__N5BxXWccz8e3_2TBG4WGCCCkrzARtrjImLs7cTXU6ssw3f2x9O5pEr7_AMQIQes.Z4isLQ.E53VNTT8IoV9LwSInsUEvpHw6nY; wordpress_test_cookie=WP%20Cookie%20check; wp_lang=en_US; wordpress_logged_in_cd9b744c619529c4988e0e94344eaf12=mmedhat%7C1742986795%7CJvttaVnOevXTKqtgdF7wuDfAsFwOmVRnnZnWrpJgHIw%7C2193c796c823ad4a27bfa406c156ca57046a39d4446e62a9cb290ff15aea5741; wp-settings-time-1=1742729126; wp-settings-1=libraryContent%3Dbrowse%26hidetb%3D1',
        Cookie:
            'wpforms_fields_group_settings_advanced=true; wordpress_sec_20aebcf5149dd51b96ef90ee8991b0b1=admin%7C1743509544%7CaFswZ6X9AM3FhZINz83eBV7C3WG27KSfV1TmeRBH9mF%7Cd39ad9ba7bf3531113d77ea0e8abeb715d8e73b5ce31e85b147fc3aab4bf74b6; wordpress_test_cookie=WP%20Cookie%20check; wp_lang=en_US; _lscache_vary=e2513e1517aa363879b2a1120187fd08; wordpress_logged_in_20aebcf5149dd51b96ef90ee8991b0b1=admin%7C1743509544%7CaFswZ6X9AM3FhZINz83eBV7C3WG27KSfV1TmeRBH9mF%7C039fdecfb1264bed56c594a558d0192eb23256500077b3c4683d6ff523fd0e1a; wp-settings-time-2=1743336770',
    };

    const formData = new FormData();
    formData.append('wpforms[fields][6]', '');
    formData.append('wpforms[fields][1][first]', data.firstName);
    formData.append('wpforms[fields][1][last]', data.lastName);
    formData.append('wpforms[fields][2]', data.email);
    formData.append('wpforms[fields][4]', data.position);
    formData.append('wpforms[fields][7]', '');
    formData.append('wpforms[fields][5]', data.cv);
    formData.append('wpforms[fields][3]', data.message);
    formData.append('wpforms[id]', form_constants.id);
    formData.append('wpforms[nonce]', form_constants.nonce);
    formData.append('page_id', form_constants.page_id);
    formData.append('wpforms[post_id]', form_constants.post_id);
    formData.append('wpforms[submit]', form_constants.submit);
    formData.append('wpforms[token]', form_constants.token);
    formData.append('action', form_constants.action);

    // const body = {
    //   wpforms: {
    //     fields: {
    //       6: '',
    //       1: { first: data.firstName, last: data.lastName },
    //       2: data.email,
    //       4: data.position,
    //       7: '',
    //       5: data.cv,
    //       3: data.message
    //     },
    //     id: '152',
    //     nonce: '8158beb756',
    //     post_id: '2',
    //     submit: 'wpforms-submit',
    //     token: '33d6aaa109566c6ed4908ed07a364f88',
    //   },
    //   page_title: 'Careers',
    //   page_id: '2',
    //   action: 'wpforms_submit',
    // };

    fetch(url, {
        method: 'POST',
        headers,
        mode: 'no-cors',
        body: formData, // Convert the body object to JSON
    })
        .then((response) => response.json())
        .then((res) => {
            if (res.data && res.data.errors) {
                console.error('Error:', res.errors);
                alert('An error occurred. Please try again later.');
                return;
            }
            alert('Form submitted successfully!');
        })
        .catch((error) => console.error('Error:', error));
};

export const submitToCareersGoogle = async (data: FormDataType) => {
    const dataArr = [];


    dataArr.push('First Name=' + data.firstName);
    dataArr.push('Last Name=' + data.lastName);
    dataArr.push('Email=' + data.email);
    dataArr.push('Position=' + data.position);
    dataArr.push('CV=' + data.cv);
    dataArr.push('Message=' + data.message);

    dataArr.push(`type=CAREERS`);
    console.log(dataArr);
    fetch(process.env.NEXT_PUBLIC_GOOGLE_URL!, {
        redirect: 'follow',
        method: 'POST',
        body: dataArr.join('&'),
        mode: 'no-cors',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        },
    })
        .then(function (response) {
            // Check if the request was successful
            if (response) {
                return response; // Assuming your script returns JSON response
            } else {
                throw new Error('Failed to submit the form.');
            }
        })
        .catch(function (error) {
            alert('Failed to submit, please try again later.');
            console.log(error);
        }).finally(() => {
            alert('Form submitted successfully!');
        }
        );
};