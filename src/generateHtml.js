// SVG Icons for each employee

const svgs = {
  Manager: `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
  `,
  Engineer: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  
      `,
  Intern: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
      `,
};
// Manager template

const generateManagerTemplate = (manager) => {
  return `
      <div class="h-[28rem] w-[20rem]  text-2xl  shadow-2xl shadow-[rgba(0,0,0,0.34)] text-white">
      <div class="w-full bg-blue-600 text-white h-[30%] p-4 text-4xl">
          <div class="flex flex-col gap-3">
              <h1>${manager.getName()}</h1>
              <div class="flex w-full gap-2 text-2xl items-center">
              ${svgs.Manager}
              ${manager.getRole()}
              </div>
          </div>
      </div>
      <div class="w-full h-full flex justify-center text-black">
          <ul class="p-8 w-full">
          
              <li class="border-b border-gray-300 py-2">ID: ${manager.getId()}</li>
              <li class="border-b border-gray-300 py-2">Email: ${manager.getEmail()}</li>
              <li class="border-b border-gray-300 py-2">Office number: ${manager.getOfficeNumber()}</li>
          </ul>
      </div>
  </div> 
  `;
};

// Employee template for both Intern and Engineer

const generateEmployeeTemplate = (employee) => {
  const empRole = employee.getRole();

  return `
      <div class="h-[28rem] w-[20rem]  text-2xl  shadow-2xl shadow-[rgba(0,0,0,0.34)] text-white">
      <div class="w-full bg-blue-600 text-white h-[30%] p-4 text-4xl">
          <div class="flex flex-col gap-3">
              <h1>${employee.getName()}</h1>
              <div class="flex w-full gap-2 text-2xl items-center">
              ${svgs[empRole]}
              ${empRole}
              </div>
          </div>
      </div>
      <div class="w-full h-full flex justify-center text-black">
          <ul class="p-8 w-full">
          
              <li class="border-b border-gray-300 py-2">ID: ${employee.getId()}</li>
              <li class="border-b border-gray-300 py-2">Email: ${employee.getEmail()}</li>
              ${
                empRole === "Engineer"
                  ? `<li class="border-b border-gray-300 py-2">Github: <a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a></li>`
                  : `<li class="border-b border-gray-300 py-2">School: ${employee.getSchool()}</li>`
              }
          </ul>
      </div>
  </div>    
      
  `;
};

// Generates employee html and maps through each employee generating unique html

function generateHtml(manager, employees) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          
      </head>
      <body>
          <header class="w-full absolute bg-blue-800 p-8 text-2xl flex items-center justify-center text-white">
              EMPLOYEES
          </header>
          <main class="w-full min-h-screen">
              <section class="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full h-full place-items-center place-content-center m-auto justify-center max-w-[1240px]  py-44">
                  ${generateManagerTemplate(manager)}
                  ${employees
                    .map((emp) => {
                      return generateEmployeeTemplate(emp);
                    })
                    .join("")}
              </section>
          </main>
          <script src="https://cdn.tailwindcss.com"></script>
      </body>
      </html>
  
      `;
}

module.exports = { generateHtml };
