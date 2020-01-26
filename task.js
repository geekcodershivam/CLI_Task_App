const readline=require("readline");
const chalk=require("chalk");
const figlet=require("figlet");

// Creating Interface > input , output and starting point 


const reader=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    prompt:"$ "
})

console.clear();
console.log(chalk.magentaBright(figlet.textSync('TASK CLI')));
// TaskArray > store
const taskArr=[];
//Prompt > $ reader
reader.prompt();
// Inbuilt Function > line 
reader.on("line",function(data){
//console.log(chalk.cyan(data));
var cmd=data.split(" ")[0];
//console.log(cmd);
var dataArr=data.split(" ")
dataArr.shift();
var dname=dataArr.join(" ");
//console.log(dname);


// Tasks Commands

// Help
if(cmd=='help'){
    console.log(chalk.bgYellow.bold("Availabe commands:"))
    console.log(chalk.yellow(`
    1.add task_name
    2.ls (to list all task)
    3.delete id (Enter task_id to delete it)
    4.rename id (Enter task_id and rename_task)
    5.sort (by task_name)
    6.exit terminal
    `))
}
// Add Task
else if(cmd=='add' && dname.length >0){
taskArr.push(dname);
console.log(chalk.green(`File ${chalk.magenta.underline.bold(dname)} added`));
}
//Read Task
else if(cmd=="ls"){
    if(taskArr.length===0){
        console.log(chalk.bgRed.bold("They Is No File Availabe At This Time"))
    }
    else{
        for(let i=0; i<taskArr.length; i++){
            console.log(`${chalk.yellow.bold(i+1)} . ${chalk.magenta.underline.bold(taskArr[i])}`);
        }
    }
}
// Delete Task
else if(cmd=='delete' && dname.length>0){
    //console.log("imdelete")
    var id=dname.split(" ")[0]-1;
    //console.log(id);

    if(taskArr.length>id){
    taskArr.splice(id,1);
    console.log(chalk.magenta(`File ${chalk.cyanBright.bold(id+1)} Deleted`));
    }

    else if(taskArr.length==0){
        console.log(chalk.bgRed.bold("They Is No File Availabe At This Time"))
    }
    else{
        console.log(chalk.bgCyan.bold("File Id Is Not Found."))
    }

}

//Sort By TaskName
else if(cmd=='sort'){
    taskArr.sort()
    taskArr.forEach((newarr)=>{
        console.log(chalk.magentaBright.bold(newarr));
    })   
}

//Rename TaskName
else if(cmd=='rename'){
    //console.log("iam rename");
    var index=dname.split("")[0]-1;
    //console.log(index);
    var clonename=dname.split(" ");
    clonename.shift()
    var rename=clonename.join(" ");
    //console.log(rename);
    taskArr.indexOf(index);
    if (index > -1 && taskArr.length>index) {
        taskArr.splice(index,1);
        taskArr.splice(index,0,rename)
        console.log(chalk.magenta(`File ${chalk.green.underline.bold(rename)} Changed`));
      }
      else{
          console.log(chalk.bgCyan.bold("Sorry File Is Not Found"));
      }
    
    
    
}

//Terminal Close Command
else if(cmd=='exit'){
reader.emit('close');
}

//Wrong Commands
else {
    console.log(chalk.bgRed.bold("Sorry ! You Enter Wrong Command"));
}

reader.prompt();
})

//Terminal close command function
reader.on('close',function(){
    console.log(chalk.bgYellow.bold(`Thanks You For Using This Command Line Interface Application`))
})