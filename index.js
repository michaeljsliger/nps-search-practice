const apiKey = 'cN3B5HEBHtHlPjj4mL9NbbehtO6ngktAtDQ8V28O';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function handleGoClick() {
  $('form').on('submit', function(e){
    e.preventDefault();
    const val = $('#inputID').val();
    const max = $('.max-inputs').val();
    // const parkcode = $('#stateCode').val();
    let arr = [];
    
    const params = {
      q: val,
      api_key: apiKey,
      limit: max,
      // parkCode: parkcode

    }

    // $('.results').empty();
    
    const searchQuery = $.param(params);

    fetch(`${searchURL}?${searchQuery}`)
      .then(function(response){
        if (response.ok) return response.json();
        throw new Error('Something went astray');
      }).then(function(jsonData){
        console.log(jsonData);
        for (let i = 0; i < jsonData.data.length; i++){
          let curr = jsonData.data[i];
          let curr1 = curr.addresses.find(el => el.type === 'Physical')
          let curr2 = `${curr1.line1}, ${curr1.city}, ${curr1.stateCode}`
          arr.push(`<h3>${curr.fullName}</h3><h5>${curr.description}</h5><h6><a href='curr.url'>Link to the Park website</a> Address:${curr2}</h6>`)
        }
        $('.results').html(arr);
      })
  });
}

function main() {
  handleGoClick();
}

main();