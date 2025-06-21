const args = process.argv.slice(2);

if(args.length === 0){
    console.log("Please enter your numbers");
}else{
    var sum = 0;
    
    for(let i= 0; i < args.length; i++){
        sum = sum + Number(args[i]);
        if (isNaN(sum)) {
            console.log(Invalid number: "${args[i]}");
            process.exit(1);
        }
    }
    const avg = sum/args.length;
    console.log(avg);
}
