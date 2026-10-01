/* =========================================================
   PAYROLLPIXEL AI
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   NAVIGATION
   ========================================================= */

const buttons = document.querySelectorAll('.nav button');

const pages = document.querySelectorAll('.page');


buttons.forEach(button => {

    button.addEventListener('click', () => {

        navigateToPage(
            button.dataset.page
        );

    });

});


function navigateToPage(pageName){

    /* Remove active from all buttons */

    buttons.forEach(button => {

        button.classList.remove('active');

    });


    /* Add active to selected button */

    const activeButton =
        document.querySelector(
            `.nav button[data-page="${pageName}"]`
        );


    if(activeButton){

        activeButton.classList.add('active');

    }


    /* Hide all pages */

    pages.forEach(page => {

        page.classList.remove('active');

    });


    /* Show selected page */

    const targetPage =
        document.getElementById(
            'page-' + pageName
        );


    if(targetPage){

        targetPage.classList.add('active');

    }


    /* Close mobile sidebar */

    const sidebar =
        document.getElementById('sidebar');


    if(sidebar){

        sidebar.classList.remove('open');

    }


    /* Scroll to top */

    window.scrollTo({

        top:0,
        behavior:'smooth'

    });

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menu =
    document.getElementById('menu');


if(menu){

    menu.addEventListener(
        'click',
        () => {

            document
                .getElementById('sidebar')
                .classList.toggle('open');

        }
    );

}


/* =========================================================
   TOAST
   ========================================================= */

function toast(msg){

    const t =
        document.getElementById('toast');


    if(!t){

        return;

    }


    t.textContent =
        msg;


    t.classList.add('show');


    clearTimeout(
        window.__t
    );


    window.__t =
        setTimeout(() => {

            t.classList.remove('show');

        },2200);

}


/* =========================================================
   EMPLOYEE SEARCH
   ========================================================= */

function filterEmployees(){

    const input =
        document.getElementById(
            'empSearch'
        );


    if(!input){

        return;

    }


    const q =
        input.value
            .toLowerCase()
            .trim();


    document
        .querySelectorAll(
            '#empBody tr'
        )
        .forEach(row => {

            row.style.display =
                row.textContent
                    .toLowerCase()
                    .includes(q)
                    ? ''
                    : 'none';

        });

}


/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

const globalSearch =
    document.getElementById(
        'globalSearch'
    );


if(globalSearch){

    globalSearch.addEventListener(
        'keydown',
        e => {

            if(e.key !== 'Enter'){

                return;

            }


            const q =
                e.target.value
                    .trim()
                    .toLowerCase();


            if(!q){

                return;

            }


            /* Dashboard */

            if(
                q.includes('dashboard') ||
                q.includes('home') ||
                q.includes('overview')
            ){

                navigateToPage(
                    'dashboard'
                );

                return;

            }


            /* Employees */

            if(
                q.includes('employee') ||
                q.includes('employees') ||
                q.includes('people') ||
                q.includes('staff')
            ){

                navigateToPage(
                    'employees'
                );

                return;

            }


            /* Payroll */

            if(
                q.includes('payroll') ||
                q.includes('salary') ||
                q.includes('payment')
            ){

                navigateToPage(
                    'payroll'
                );

                return;

            }


            /* Reports + Analysis */

            if(
                q.includes('report') ||
                q.includes('reports') ||
                q.includes('analysis') ||
                q.includes('analytics') ||
                q.includes('forecast') ||
                q.includes('forecasting') ||
                q.includes('prediction')
            ){

                navigateToPage(
                    'reports'
                );

                return;

            }


            /* AI Agent */

            if(
                q.includes('agent') ||
                q.includes('assistant')
            ){

                navigateToPage(
                    'ai-agent'
                );

                return;

            }


            /* Settings */

            if(
                q.includes('setting') ||
                q.includes('settings') ||
                q.includes('configuration')
            ){

                navigateToPage(
                    'settings'
                );

                return;

            }


            toast(
                'No matching section found'
            );

        }
    );

}


/* =========================================================
   AI AGENT ELEMENTS
   ========================================================= */

const aiAgentInput =
    document.getElementById(
        'aiAgentInput'
    );


const aiAgentSend =
    document.getElementById(
        'aiAgentSend'
    );


const aiAgentMessages =
    document.getElementById(
        'aiAgentMessages'
    );


const agentCommands =
    document.querySelectorAll(
        '.agent-command'
    );


/* =========================================================
   ADD AI MESSAGE
   ========================================================= */

function addAgentMessage(
    message,
    type='agent'
){

    if(!aiAgentMessages){

        return;

    }


    const wrapper =
        document.createElement(
            'div'
        );


    wrapper.className =
        `agent-message ${type}`;


    const avatar =
        document.createElement(
            'div'
        );


    avatar.className =
        'message-avatar';


    avatar.textContent =
        type === 'user'
            ? 'AK'
            : '✦';


    const content =
        document.createElement(
            'div'
        );


    content.className =
        'message-content';


    const name =
        document.createElement(
            'b'
        );


    name.textContent =
        type === 'user'
            ? 'You'
            : 'PayrollPixel AI';


    const text =
        document.createElement(
            'p'
        );


    text.textContent =
        message;


    content.appendChild(
        name
    );


    content.appendChild(
        text
    );


    wrapper.appendChild(
        avatar
    );


    wrapper.appendChild(
        content
    );


    aiAgentMessages.appendChild(
        wrapper
    );


    aiAgentMessages.scrollTop =
        aiAgentMessages.scrollHeight;

}


/* =========================================================
   TYPING INDICATOR
   ========================================================= */

function showTyping(){

    if(!aiAgentMessages){

        return;

    }


    const wrapper =
        document.createElement(
            'div'
        );


    wrapper.className =
        'agent-message agent';


    wrapper.id =
        'agentTypingMessage';


    const avatar =
        document.createElement(
            'div'
        );


    avatar.className =
        'message-avatar';


    avatar.textContent =
        '✦';


    const content =
        document.createElement(
            'div'
        );


    content.className =
        'message-content';


    const name =
        document.createElement(
            'b'
        );


    name.textContent =
        'PayrollPixel AI';


    const typing =
        document.createElement(
            'div'
        );


    typing.className =
        'agent-typing';


    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;


    content.appendChild(
        name
    );


    content.appendChild(
        typing
    );


    wrapper.appendChild(
        avatar
    );


    wrapper.appendChild(
        content
    );


    aiAgentMessages.appendChild(
        wrapper
    );


    aiAgentMessages.scrollTop =
        aiAgentMessages.scrollHeight;

}


function hideTyping(){

    const typing =
        document.getElementById(
            'agentTypingMessage'
        );


    if(typing){

        typing.remove();

    }

}


/* =========================================================
   NORMALIZE COMMAND
   ========================================================= */

function normalizeCommand(
    command
){

    return command
        .toLowerCase()
        .trim()
        .replace(/[?!.,]/g,'')
        .replace(/\s+/g,' ');

}


/* =========================================================
   AI COMMAND PROCESSOR
   ========================================================= */

function processAICommand(
    command
){

    const q =
        normalizeCommand(
            command
        );


    if(!q){

        return {

            response:
                'Please tell me what you want to do.'

        };

    }


    /* =====================================================
       DASHBOARD
       ===================================================== */

    if(
        q.includes('dashboard') ||
        q.includes('home') ||
        q.includes('overview') ||
        q.includes('go home')
    ){

        navigateToPage(
            'dashboard'
        );


        return {

            response:
                'Sure. I opened the Dashboard for you.'

        };

    }


    /* =====================================================
       EMPLOYEES
       ===================================================== */

    if(
        q.includes('employee') ||
        q.includes('employees') ||
        q.includes('people') ||
        q.includes('workforce') ||
        q.includes('staff')
    ){

        navigateToPage(
            'employees'
        );


        const employeeNames = [

            'rahul',
            'priya',
            'amit',
            'neha'

        ];


        const foundEmployee =
            employeeNames.find(
                name =>
                    q.includes(name)
            );


        if(foundEmployee){

            const search =
                document.getElementById(
                    'empSearch'
                );


            if(search){

                search.value =
                    foundEmployee;


                filterEmployees();

            }


            return {

                response:
                    `I opened People and searched for "${foundEmployee}".`

            };

        }


        return {

            response:
                'I opened the People section for you.'

        };

    }


    /* =====================================================
       PAYROLL
       ===================================================== */

    if(
        q.includes('payroll') ||
        q.includes('salary') ||
        q.includes('salaries') ||
        q.includes('payment') ||
        q.includes('payments')
    ){

        navigateToPage(
            'payroll'
        );


        return {

            response:
                'I opened Payroll. You can view payroll records and payment status here.'

        };

    }


    /* =====================================================
       REPORTS + ANALYSIS
       ===================================================== */

    if(
        q.includes('report') ||
        q.includes('reports') ||
        q.includes('analysis') ||
        q.includes('analytics') ||
        q.includes('forecast') ||
        q.includes('forecasting') ||
        q.includes('prediction') ||
        q.includes('predictions') ||
        q.includes('ai analysis') ||
        q.includes('ai insights')
    ){

        navigateToPage(
            'reports'
        );


        return {

            response:
                'I opened Reports & Analysis. You can view reports, payroll trends and AI-powered forecasts here.'

        };

    }


    /* =====================================================
       SETTINGS
       ===================================================== */

    if(
        q.includes('setting') ||
        q.includes('settings') ||
        q.includes('configuration') ||
        q.includes('configure')
    ){

        navigateToPage(
            'settings'
        );


        return {

            response:
                'I opened Settings for you.'

        };

    }


    /* =====================================================
       RUN PAYROLL
       ===================================================== */

    if(
        q.includes('run payroll') ||
        q.includes('process payroll') ||
        q.includes('start payroll')
    ){

        navigateToPage(
            'payroll'
        );


        setTimeout(() => {

            toast(
                'Payroll processing started'
            );

        },300);


        return {

            response:
                'I opened Payroll and started the payroll processing action.'

        };

    }


    /* =====================================================
       OPEN AI AGENT
       ===================================================== */

    if(
        q.includes('open agent') ||
        q.includes('ai agent') ||
        q.includes('assistant')
    ){

        navigateToPage(
            'ai-agent'
        );


        return {

            response:
                'You are now using the PayrollPixel AI Agent.'

        };

    }


    /* =====================================================
       HELP
       ===================================================== */

    if(
        q === 'help' ||
        q.includes('what can you do') ||
        q.includes('what can you') ||
        q.includes('commands')
    ){

        return {

            response:
                'I can open Dashboard, People, Payroll, Reports & Analysis and Settings. I can also search employees and start payroll processing.'

        };

    }


    /* =====================================================
       UNKNOWN
       ===================================================== */

    return {

        response:
            `I understood your request as "${command}", but I don't have an action for it yet. Try commands like "Show employees", "Open payroll", "Open reports", "Show AI forecasting", or "Go to dashboard".`

    };

}


/* =========================================================
   SEND AI COMMAND
   ========================================================= */

function sendAICommand(
    command=null
){

    if(!aiAgentInput){

        return;

    }


    const text =
        command !== null
            ? command
            : aiAgentInput.value.trim();


    if(!text){

        return;

    }


    /* USER MESSAGE */

    addAgentMessage(
        text,
        'user'
    );


    /* CLEAR INPUT */

    aiAgentInput.value =
        '';


    /* SHOW TYPING */

    showTyping();


    /* AI RESPONSE */

    setTimeout(() => {

        hideTyping();


        const result =
            processAICommand(
                text
            );


        addAgentMessage(
            result.response,
            'agent'
        );


    },550);

}


/* =========================================================
   SEND BUTTON
   ========================================================= */

if(aiAgentSend){

    aiAgentSend.addEventListener(
        'click',
        () => {

            sendAICommand();

        }
    );

}


/* =========================================================
   ENTER KEY
   ========================================================= */

if(aiAgentInput){

    aiAgentInput.addEventListener(
        'keydown',
        e => {

            if(e.key === 'Enter'){

                e.preventDefault();

                sendAICommand();

            }

        }
    );

}


/* =========================================================
   SUGGESTED COMMANDS
   ========================================================= */

agentCommands.forEach(
    button => {

        button.addEventListener(
            'click',
            () => {

                const command =
                    button.dataset.command;


                if(command){

                    sendAICommand(
                        command
                    );

                }

            }
        );

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

console.log(
    'PayrollPixel AI initialized successfully.'
);

console.log(
    'Reports & Analysis module initialized.'
);

console.log(
    'AI Agent initialized successfully.'
);
