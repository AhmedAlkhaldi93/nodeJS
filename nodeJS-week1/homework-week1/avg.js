
const args = process.argv.slice(2);

if(args.length === 0){
    console.log("Please enter your numbers");
}else{
    var sum = 0;
    for(let i= 0; i < args.length; i++){
        sum = sum + Number(args[i]);
    }
    const avg = sum/args.length;
    console.log(avg);
}