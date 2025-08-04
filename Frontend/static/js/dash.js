window.addEventListener("load",async ()=>{
    loadDetails();
})

async function loadDetails() {
    try{
        const response = await fetch("/ShowData"); // API endpoint for favorites
        if (!response.ok) throw new Error("Failed to fetch favorites");
        const Details= await response.json();
        renderData(Details);
    }
    catch(error){
        console.error('Error loading',error);
    }

    
}

function renderData(details){
    let name=document.getElementById('name');
    const greeting=document.createElement('span');
    greeting.textContent=`Hi ${details.name} ${details.lastname} !! `;
    name.insertAdjacentElement('afterbegin',greeting)

    let refcode=document.getElementById('refcode');
    refcode.innerText=`(Referal Code: ${details.name}${details.referal})`;

    let amt=document.getElementById('amt');
    amt.innerText=`₹ ${details.amt}`;

}

async function RewardList() {
    const response=await fetch("/Rewards");
    if(!response.ok) throw new Error('Error Fetching Data');
    const Details=await response.json();
    renderReward(Details);
}

function renderReward(details){
    let listing=details.Rewards;
    console.log(details.Rewards);
    const parent=document.getElementById('rewlist');
    console.log(listing)
    parent.textContent=''
    listing.forEach(i => {
        console.log(i)
        const ele=document.createElement('div');
        ele.className='rewardname';
        ele.textContent=i;
        parent.appendChild(ele);
    });

}

