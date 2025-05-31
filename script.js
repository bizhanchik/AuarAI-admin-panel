const form = document.getElementById('addClothForm');
const msg = document.getElementById('message');
const tokenInput = document.getElementById('token');

tokenInput.value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI1ZTA3NDMxODViYWM4YmJmMDBjOGQiLCJpYXQiOjE3NDgwMDg2OTYsImV4cCI6MTc0ODA5NTA5Nn0.87ZM0EY-001RT7Pd34Xuv7rz_qhOk_S1CHZvpqajaMw";

form.addEventListener('submit', async e => {
    e.preventDefault();
    const token = document.getElementById('token').value.trim();
    if (!token) {
        msg.textContent = 'Please type in token';
        return;
    }

    const data = {};
    new FormData(form).forEach((val, key) => {
        if (['color', 'size', 'tags', 'occasions', 'weatherSuitability'].includes(key)) {
            data[key] = val ? val.split(',').map(s => s.trim()) : [];
        } else if (key === 'price') {
            data[key] = parseFloat(val);
        } else {
            data[key] = val.trim();
        }
    });

    try {
        const res = await fetch('https://auarai.onrender.com/api/addcloth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        if (res.ok) {
            msg.textContent = '✅ Cloth is successfully added! ✅';
            form.reset();
        } else {
            msg.textContent = 'Error: ' + (json.msg || JSON.stringify(json));
            console.error('Server error response:', json);
        }

    } catch (err) {
        msg.textContent = 'Server error: ' + err.message;
        console.error('Fetch error:', err);
    }
});