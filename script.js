const form = document.getElementById('addClothForm');
const msg = document.getElementById('message');

form.addEventListener('submit', async e =>{
    e.preventDefault();
    const token = document.getElementById('token').value.trim();
    if(!token) {
        msg.textContent= 'Please type in token';
        return;
    }
    const data = {};
    new FormData(form).forEach((val,key) =>{
        if(['color', 'size', 'tags', 'occasions', 'weatherSuitability'].includes(key)){
            data[key] = val ? val.split(',').map(s => s.trim()) : [];
        }else if(key === 'price') {
            data[key] = parseFloat(val);
        }else {
            data[key] = val;
        }
    });

    try {
        const res = await fetch('https://auarai.onrender.com/api/addcloth',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authosization': 'Bearer '+ token
            },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        if(res.ok) {
            msg.textContent = '✅ Cloth is succesfully added! ✅'
            form.reset();
        } else{
            msg.textContent = 'Error: '+ (json.msg || JSON.stringify(json));
        }
        
    } catch(err){
        msg.textContent = 'Server error: '+ err.message;
    }
});