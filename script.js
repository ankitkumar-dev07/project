/* =========================================================
   PAYROLLPIXEL AI
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const buttons =
    document.querySelectorAll('.nav button');

const pages =
    document.querySelectorAll('.page');

const sidebar =
    document.getElementById('sidebar');

const menu =
    document.getElementById('menu');

const globalSearch =
    document.getElementById('globalSearch');

const empSearch =
    document.getElementById('empSearch');

const aiAgentInput =
    document.getElementById('aiAgentInput');

const aiAgentSend =
    document.getElementById('aiAgentSend');

const aiAgentMessages =
    document.getElementById('aiAgentMessages');

const agentCommands =
    document.querySelectorAll('.agent-command');


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function navigateToPage(pageName){

    buttons.forEach(button => {

        button.classList.remove('active');

    });


    const activeButton =
        document.querySelector(
            `.nav button[data-page="${pageName}"]`
        );


    if(activeButton){

        activeButton.classList.add('active');

    }


    pages.forEach(page => {

        page.classList.remove('active');

    });


    const target =
        document.getElementById(
            `page-${pageName}`
        );


    if(target){

        target.classList.add('active');

    }


    if(sidebar){

        sidebar.classList.remove('open');

    }


    window.scrollTo({

        top:0,
        behavior:'smooth'

    });

}


/* =========================================================
   NAV BUTTONS
   ========================================================= */

buttons.forEach(button => {

    button.addEventListener(
        'click',
        () => {

            navigateToPage(
                button.dataset.page
            );

        }
    );

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

if(menu){

    menu.addEventListener(
        'click',
        () => {

            sidebar.classList.toggle('open');

        }
    );

}


/* =========================================================
   TOAST
   ========================================================= */

function toast(message){

    const element =
        document.getElementById('toast');


    if(!element){

        return;

    }


    element.textContent =
        message;


    element.classList.add('show');


    clearTimeout(
        window.__toastTimer
    );


    window.__toastTimer =
        setTimeout(() => {

            element.classList.remove('show');

        },2200);

}


/* =========================================================
   RUN PAYROLL
   ========================================================= */

function runPayroll(){

    navigateToPage('payroll');

    setTimeout(() => {

        toast(
            'Payroll processing started'
        );

    },250);

}


/* =========================================================
   EMPLOYEE SEARCH
   ========================================================= */

function filterEmployees(){

    if(!empSearch){

        return;

    }


    const query =
        empSearch.value
            .toLowerCase()
            .trim();


    document
        .querySelectorAll('#empBody tr')
        .forEach(row => {

            row.style.display =
                row.textContent
                    .toLowerCase()
                    .includes(query)
                    ? ''
                    : 'none';

        });

}


if(empSearch){

    empSearch.addEventListener(
        'input',
        filterEmployees
    );

}


/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

if(globalSearch){

    globalSearch.addEventListener(
        'keydown',
        event => {

            if(event.key !== 'Enter'){

                return;

            }


            const query =
                globalSearch.value
                    .toLowerCase()
                    .trim();


            if(!query){

                return;

            }


            if(
                query.includes('dashboard') ||
                query.includes('home') ||
                query.includes('overview')
            ){

                navigateToPage(
                    'dashboard'
                );

                return;

            }


            if(
                query.includes('employee') ||
                query.includes('employees') ||
                query.includes('people') ||
                query.includes('staff')
            ){

                navigateToPage(
                    'employees'
                );

                return;

            }


            if(
                query.includes('payroll') ||
                query.includes('payrun') ||
                query.includes('salary') ||
                query.includes('payment')
            ){

                navigateToPage(
                    'payroll'
                );

                return;

            }


            if(
                query.includes('report') ||
                query.includes('reports') ||
                query.includes('analytics') ||
                query.includes('analysis') ||
                query.includes('forecast') ||
                query.includes('prediction')
            ){

                navigateToPage(
                    'reports'
                );

                return;

            }


            if(
                query.includes('agent') ||
                query.includes('insights')
            ){

                navigateToPage(
                    'ai-agent'
                );

                return;

            }


            if(
                query.includes('company') ||
                query.includes('profile')
            ){

                navigateToPage(
                    'company-profile'
                );

                return;

            }


            if(
                query.includes('user') ||
                query.includes('role') ||
                query.includes('permission')
            ){

                navigateToPage(
                    'users-roles'
                );

                return;

            }


            if(
                query.includes('integration') ||
                query.includes('connect')
            ){

                navigateToPage(
                    'integrations'
                );

                return;

            }


            if(
                query.includes('tax') ||
                query.includes('pf') ||
                query.includes('pt')
            ){

                navigateToPage(
                    'payroll'
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
   AI AGENT MESSAGE
   ========================================================= */

function addAgentMessage(
    message,
    type='agent'
){

    if(!aiAgentMessages){

        return;

    }


    const wrapper =
        document.createElement('div');


    wrapper.className =
        `agent-message ${type}`;


    const avatar =
        document.createElement('div');


    avatar.className =
        'message-avatar';


    avatar.textContent =
        type === 'user'
            ? 'AK'
            : '✦';


    const content =
        document.createElement('div');


    content.className =
        'message-content';


    const name =
        document.createElement('b');


    name.textContent =
        type === 'user'
            ? 'You'
            : 'PayrollPixel AI';


    const text =
        document.createElement('p');


    text.textContent =
        message;


    content.appendChild(name);

    content.appendChild(text);

    wrapper.appendChild(avatar);

    wrapper.appendChild(content);

    aiAgentMessages.appendChild(wrapper);


    aiAgentMessages.scrollTop =
        aiAgentMessages.scrollHeight;

}


/* =========================================================
   TYPING
   ========================================================= */

function showTyping(){

    if(!aiAgentMessages){

        return;

    }


    const wrapper =
        document.createElement('div');


    wrapper.className =
        'agent-message agent';

    wrapper.id =
        'agentTypingMessage';


    wrapper.innerHTML = `

        <div class="message-avatar">
            ✦
        </div>

        <div class="message-content">

            <b>
                PayrollPixel AI
            </b>

            <div class="agent-typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    `;


    aiAgentMessages.appendChild(
        wrapper
    );


    aiAgentMessages.scrollTop =
        aiAgentMessages.scrollHeight;

}


function hideTyping(){

    const element =
        document.getElementById(
            'agentTypingMessage'
        );


    if(element){

        element.remove();

    }

}


/* =========================================================
   AI COMMAND PROCESSOR
   ========================================================= */

function processAICommand(command){

    const query =
        command
            .toLowerCase()
            .trim()
            .replace(/[?!.,]/g,'')
            .replace(/\s+/g,' ');


    /* DASHBOARD */

    if(
        query.includes('dashboard') ||
        query.includes('home') ||
        query.includes('overview')
    ){

        navigateToPage(
            'dashboard'
        );


        return 'I opened the Dashboard for you.';

    }


    /* EMPLOYEES */

    if(
        query.includes('employee') ||
        query.includes('employees') ||
        query.includes('people') ||
        query.includes('workforce') ||
        query.includes('staff')
    ){

        navigateToPage(
            'employees'
        );


        const names = [
            'rahul',
            'priya',
            'amit',
            'neha'
        ];


        const found =
            names.find(
                name => query.includes(name)
            );


        if(found && empSearch){

            empSearch.value =
                found;

            filterEmployees();


            return `I opened Employees and searched for ${found}.`;

        }


        return 'I opened the Employees section for you.';

    }


    /* PAYROLL */

    if(
        query.includes('payroll') ||
        query.includes('payrun') ||
        query.includes('salary') ||
        query.includes('payment')
    ){

        navigateToPage(
            'payroll'
        );


        return 'I opened Payroll for you.';

    }


    /* TAX */

    if(
        query.includes('tax') ||
        query.includes('pf') ||
        query.includes('professional tax') ||
        query.includes('pt')
    ){

        navigateToPage(
            'payroll'
        );


        return 'I opened Payroll and its Tax Settings section.';

    }


    /* REPORTS */

    if(
        query.includes('report') ||
        query.includes('reports') ||
        query.includes('analytics') ||
        query.includes('analysis') ||
        query.includes('forecast') ||
        query.includes('forecasting') ||
        query.includes('prediction') ||
        query.includes('predictions')
    ){

        navigateToPage(
            'reports'
        );


        return 'I opened Reports & Analytics, including AI Forecasting & Analysis.';

    }


    /* COMPANY PROFILE */

    if(
        query.includes('company profile') ||
        query.includes('company information') ||
        query.includes('company details')
    ){

        navigateToPage(
            'company-profile'
        );


        return 'I opened Company Profile for you.';

    }


    /* USERS */

    if(
        query.includes('users') ||
        query.includes('user') ||
        query.includes('roles') ||
        query.includes('permissions')
    ){

        navigateToPage(
            'users-roles'
        );


        return 'I opened Users & Roles for you.';

    }


    /* INTEGRATIONS */

    if(
        query.includes('integration') ||
        query.includes('integrations') ||
        query.includes('connect service')
    ){

        navigateToPage(
            'integrations'
        );


        return 'I opened Integrations for you.';

    }


    /* INSIGHTS AGENT */

    if(
        query.includes('insights agent') ||
        query.includes('ai agent') ||
        query.includes('open agent')
    ){

        navigateToPage(
            'ai-agent'
        );


        return 'You are now in the Insights Agent.';

    }


    /* RUN PAYROLL */

    if(
        query.includes('run payroll') ||
        query.includes('process payroll') ||
        query.includes('start payroll')
    ){

        runPayroll();


        return 'I opened Payroll and started the payroll processing action.';

    }


    /* HELP */

    if(
        query === 'help' ||
        query.includes('what can you do') ||
        query.includes('commands')
    ){

        return 'I can open Dashboard, Employees, Payroll, Reports & Analytics, Insights Agent, Company Profile, Users & Roles and Integrations.';

    }


    return `I understood "${command}", but that action is not available yet. Try "Show employees", "Open payroll", "Open reports", "Open company profile" or "Open integrations".`;

}


/* =========================================================
   SEND AI COMMAND
   ========================================================= */

function sendAICommand(command=null){

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


    addAgentMessage(
        text,
        'user'
    );


    aiAgentInput.value =
        '';


    showTyping();


    setTimeout(() => {

        hideTyping();


        const response =
            processAICommand(
                text
            );


        addAgentMessage(
            response,
            'agent'
        );

    },500);

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
        event => {

            if(event.key === 'Enter'){

                event.preventDefault();

                sendAICommand();

            }

        }
    );

}


/* =========================================================
   SUGGESTED COMMANDS
   ========================================================= */

agentCommands.forEach(button => {

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

});


/* =========================================================
   TAX SETTINGS
   ========================================================= */

const countrySelect =
    document.getElementById(
        'countrySelect'
    );

const taxSave =
    document.getElementById(
        'taxSave'
    );


if(countrySelect){

    countrySelect.addEventListener(
        'change',
        () => {

            const country =
                countrySelect.options[
                    countrySelect.selectedIndex
                ].text;


            toast(
                `${country} tax settings selected`
            );

        }
    );

}


if(taxSave){

    taxSave.addEventListener(
        'click',
        () => {

            toast(
                'Tax settings saved'
            );

        }
    );

}


/* =========================================================
   COMPANY PROFILE
   ========================================================= */

const companySave =
    document.getElementById(
        'companySave'
    );


if(companySave){

    companySave.addEventListener(
        'click',
        () => {

            toast(
                'Company profile saved'
            );

        }
    );

}


/* =========================================================
   CURRENCY
   ========================================================= */

const currencyInputs =
    document.querySelectorAll(
        'input[name="currency"]'
    );


currencyInputs.forEach(input => {

    input.addEventListener(
        'change',
        () => {

            if(input.checked){

                toast(
                    `Currency changed to ${input.value}`
                );

            }

        }
    );

});


/* =========================================================
   INITIALIZE
   ========================================================= */

console.log(
    'PayrollPixel AI initialized.'
);

console.log(
    'Reports & Analytics initialized.'
);

console.log(
    'Insights Agent initialized.'
);
