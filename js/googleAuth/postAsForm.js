import RNFetchBlob from 'rn-fetch-blob';

export default async function postAsForm(url, data) {
    var response;
    try {
        await RNFetchBlob.fetch('POST', url, {
          'Content-Type': 'multipart/form-data'
        }, [
          { name : 'assertion', data: data.assertion},
          { name : 'grant_type', data : data.grant_type},
        ])
        .then((res) => {
          console.log('res: ', res);
          let status = res.info().status;

          if(status == 200) {
            let json = res.json()
            console.log('json: ', json);
            return json;
            
          } else {
            return null
          }
        })
    } catch (err) {
        console.error("Error from server:", err && err.stack || err);
        err.response = response;
        throw err;
    }
}
