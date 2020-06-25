import { RequestMock, Selector } from "testcafe";

fixture`Getting Started`
    .page('http://localhost:4200');

const crossOriginObject = {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': 'http://localhost:4200'
};


const signIn = async (t, signInButton) => {
    await t.click(signInButton)
        .typeText("input", "ahmed.ucdenver87@gmail.com", { speed: 0.2 })
        .click("#identifierNext")
        .typeText("input[type='password']", "TIV@46280025ity", { speed: 0.2 })
        .click("#passwordNext")
        .navigateTo("http://localhost:4200");
}

const signOut = async (t, signOutButton) => {
    await t.click(signOutButton);
}

test("Should display application HEADER with contents when the user logged in and logged out", async t => {

    const header = Selector("td-header");
    await t.expect(header).ok("Header exists")

    const navTabs = await header.find("a");
    await t.expect(navTabs.count).eql(1);


    // const homeTab = await header.find("a.active.item");
    const homeTab = navTabs.nth(0);
    await t.expect(homeTab).ok("Home tab exists");
    await t.expect(homeTab.innerText).eql("Home");

 
    const signInButton = header.find("#authButton");

    await t.wait(3000);
    await t.expect(signInButton.innerText).contains("Login");

    await signIn(t, signInButton);

    await t.wait(10000);

    const signOutButton = await header.find("#authButton");
    await t.expect(signOutButton.innerText).contains("Logout");

    const welcome = await header.find("#welcome");
    await t.expect(welcome.innerText).contains("Welcome Ahmed Hameed");

    const addButton = await header.find("#addButton");
    await t.expect(addButton.innerText).contains("Add");

    await t.expect(navTabs.count).eql(3);
    await t.expect(await navTabs.nth(0).innerText).eql("Home");
    await t.expect(await navTabs.nth(1).innerText).eql("My Todo List");
    await t.expect(await navTabs.nth(2).innerText).eql("About");
});

test("Should display application BODY with contents when the user logged in and logged out", async t => {

    const header = Selector("td-header");
    const body = Selector("td-body");
    await t.expect(body).ok("Body exists");
    await t.expect(body.innerText).eql(
        "You can not access this content, please login using \"Login\" button in the top right."
    );

    const navTabs = await header.find("a");


    //The body content should be same when Home is clicked
    await t.click(navTabs.nth(0));
    await t.expect(body.innerText).eql(
        "You can not access this content, please login using \"Login\" button in the top right."
    );



    const signInButton = Selector("#authButton");

    await t.wait(3000);
    await signIn(t, signInButton);

    await t.wait(10000);

    await t.expect(body.innerText).notEql(
        "You can not access this content, please login using \"Login\" button in the top right."
    );


    await t.wait(1000);
    await t.click(navTabs.nth(0));
    await t.expect(body.innerText).notEql(
        "You can not access this content, please login using \"Login\" button in the top right."
    );

    await t.wait(1000);
    await t.click(navTabs.nth(1));
    await t.expect(body.innerText).notEql(
        "You can not access this content, please login using \"Login\" button in the top right."
    );

    await t.wait(1000);
    await t.click(navTabs.nth(2));
    await t.expect(body.innerText).notEql(
        "You can not access this content, please login using \"Login\" button in the top right."
    );
});


// test("Should display Route path when the user logged in and logged out", async t => {

//     //Should Route to home page with pathname "/"
//     await t.expect(window.location.pathname).eql("/");

//     const signInButton = Selector("#authButton");

//     await t.wait(3000);
//     await signIn(t, signInButton);

//     await t.wait(5000);

//     const leftMenu = await Selector(".left.menu");

//     //Should Route to home page with pathname "/" again
//     await t.click(leftMenu.child(0));
//     await t.expect(window.location.pathname).eql("/");

//     await t.click(leftMenu.child(1));
//     await t.expect(window.location.pathname).eql("/to-do-list");

//     await t.click(leftMenu.child(2));
//     await t.expect(window.location.pathname).eql("/about");
// });

test("Should list all todo List by logged in user", async t => {
    const data = [
        {
            id: 1,
            title: "STARQ24",
            description: "To Finish this task ASAP",
            createdByUserId: 1234,
            updatedByUserId: 0,
            completed: false
        },
        {
            id: 2,
            title: "STARQ50",
            description: "To Finish that task ASAP",
            createdByUserId: 1234,
            updatedByUserId: 0,
            completed: false
        },
        {
            id: 14,
            title: "STARQ51",
            description: "To Finish these tasks ASAP",
            createdByUserId: 1234,
            updatedByUserId: 0,
            completed: false
        }
    ];

    const mockAPI = RequestMock()
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/all',
                method: 'POST',
                isAjax: true
            }
        )
        .respond(data, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/user/update',
                method: 'POST',
                isAjax: true
            }
        )
        .respond({}, 200, crossOriginObject);

    await t.addRequestHooks(mockAPI);

    await t.wait(5000);
    const signInButton = Selector("#authButton");
    await signIn(t, signInButton);

    await t.wait(10000);

    const body = Selector("td-body");

    const list = await body.find("td-list-todo-list");
    const items = await list.find("td-item");

    await t.expect(list.exists).ok("Todolist items exists !!!");
    await t.expect(items.count).eql(data.length);


    await t.expect(items.nth(0).find("mat-card-title").innerText).eql(data[0].title + " - NOT COMPLETED");
    await t.expect(items.nth(0).find("mat-card-content").innerText).eql(data[0].description);

    await t.expect(items.nth(1).find("mat-card-title").innerText).eql(data[1].title + " - NOT COMPLETED");
    await t.expect(items.nth(1).find("mat-card-content").innerText).eql(data[1].description);

    await t.expect(items.nth(2).find("mat-card-title").innerText).eql(data[2].title + " - NOT COMPLETED");
    await t.expect(items.nth(2).find("mat-card-content").innerText).eql(data[2].description);
});

test("Should display options of some todoList item", async t => {

    const data = [
        {
            id: 1,
            title: "STARQ24",
            description: "To Finish this task ASAP",
            createdByUserId: 1234,
            updatedByUserId: 0,
            completed: false
        }
    ];

    const mockAPI = RequestMock()
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/all',
                method: 'POST',
                isAjax: true
            }
        )
        .respond(data, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/user/update',
                method: 'POST',
                isAjax: true
            }
        )
        .respond({}, 200, crossOriginObject);

    await t.addRequestHooks(mockAPI);


    await t.wait(5000);
    const signInButton = Selector("#authButton");
    await signIn(t, signInButton);

    await t.wait(5000);

    const body = Selector("td-body");

    const list = await body.find("td-list-todo-list");
    const items = await list.find("td-item");

    const firstItem = await items.nth(0);

    const actionsElem = await firstItem.find("mat-card-actions");

    await t.expect(actionsElem.exists).ok("Action options exists !!!");

    const editButton = await actionsElem.find("td-update-todo");
    await t.expect(editButton.exists).ok("Edit button exists !!!");
    await t.expect(editButton.innerText).contains("Edit");

    const otherActions = await actionsElem.find("button[mat-icon-button]");
    await t.expect(otherActions.exists).ok("Other actions dropdown exists !!!");

  

    const otherActionsIcon = await otherActions.find("mat-icon");
    await t.expect(otherActionsIcon.exists).ok("Other actions dropdown icon element exists !!!");
    await t.expect(otherActionsIcon.innerText).eql("arrow_drop_down", "Other actions dropdown icon exists !!!");


    await t.click(otherActions);

    const menu = await Selector("div.mat-menu-content");
    await t.expect(menu.exists).ok("Other actions dropdown menu exists !!!");

    await t.expect(menu.child().count).eql(2);

    await t.expect(menu.child(0).innerText).contains("Remove");
    await t.expect(menu.child(1).innerText).contains("Mark Done");
});

test("Should display option 'Mark Done' when todo item is not completed", async t => {

    const data = [
        {
            id: 1,
            title: "STARQ24",
            description: "To Finish this task ASAP",
            createdByUserId: 1234,
            updatedByUserId: 0,
            completed: false //Testing output of this value
        }
    ];

    const mockAPI = RequestMock()
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/all',
                method: 'POST',
                isAjax: true
            }
        )
        .respond(data, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/user/update',
                method: 'POST',
                isAjax: true
            }
        )
        .respond({}, 200, crossOriginObject);

    await t.addRequestHooks(mockAPI);


    await t.wait(5000);
    const signInButton = Selector("#authButton");
    await signIn(t, signInButton);

    await t.wait(5000);

    const body = Selector("td-body");
    const list = await body.find("td-list-todo-list");
    const items = await list.find("td-item");
    const firstItem = await items.nth(0);
    const actionsElem = await firstItem.find("mat-card-actions");
    const otherActions = await actionsElem.find("button[mat-icon-button]");

    await t.click(otherActions);
    const menu = await Selector("div.mat-menu-content");

    await t.expect(menu.child().count).eql(2);
    await t.expect(menu.child(0).innerText).contains("Remove");
    await t.expect(menu.child(1).innerText).contains("Mark Done");
});

test("Should NOT display option 'Mark Done' when todo item is completed", async t => {
    const data = [
        {
            id: 1,
            title: "STARQ24",
            description: "To Finish this task ASAP",
            createdByUserId: 1234,
            updatedByUserId: 0,
            completed: true //Testing output of this value
        }
    ];

    const mockAPI = RequestMock()
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/all',
                method: 'POST',
                isAjax: true
            }
        )
        .respond(data, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/user/update',
                method: 'POST',
                isAjax: true
            }
        )
        .respond({}, 200, crossOriginObject);

    await t.addRequestHooks(mockAPI);


    await t.wait(5000);
    const signInButton = Selector("#authButton");
    await signIn(t, signInButton);

    await t.wait(5000);

    const body = Selector("td-body");
    const list = await body.find("td-list-todo-list");
    const items = await list.find("td-item");
    const firstItem = await items.nth(0);
    const actionsElem = await firstItem.find("mat-card-actions");
    const otherActions = await actionsElem.find("button[mat-icon-button]");

    await t.click(otherActions);
    const menu = await Selector("div.mat-menu-content");


    await t.expect(menu.child().count).eql(1);
    await t.expect(menu.child(0).innerText).contains("Remove");
});


test("Should add a single todo item by logged in user", async t => {

    const data = [];

    let orgData = [...data];

    const mockAPI = RequestMock()
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/all',
                method: 'POST',
                isAjax: true
            }
        )
        .respond(data, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/user/update',
                method: 'POST',
                isAjax: true
            }
        )
        .respond({}, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/add',
                method: 'POST',
                isAjax: true
            },
            {
                logRequestBody: true,
                stringifyRequestBody: true
            }
        )
        .respond(async (req, res) => {

            const { title, description, completed } = JSON.parse(req.body.toString('utf8'));

            const item = {
                id: 20,
                title: title,
                description: description,
                createdByUserId: 1234,
                updatedByUserId: 0,
                completed: completed

            }
            data.push(item);

            res.setBody(data);
            res.headers = crossOriginObject;
            res.statusCode = 200;
        });

    await t.addRequestHooks(mockAPI);

    await t.wait(6000);
    const signInButton = Selector("#authButton");
    await signIn(t, signInButton);

    await t.wait(5000);


    const addButton = Selector("#addButton");

    await t.click(addButton);

    //Expect to have modal
    const formModal = Selector("#form-modal");

    await t.expect(formModal.exists).ok("Form Modal exists for add todo item !!!");
    await t.expect(await formModal.find(".mat-dialog-title").innerText).eql("ToDo Form");

    const form = formModal.find("form");
    await t.expect(form.exists).ok("ToDo form exists for add todo item !!!");

    const fields = await form.child("mat-form-field");

    // await t.expect(await fields.nth(0).find("label").exists).ok("Title label exists in the form !!!");
    // await t.expect(await fields.nth(0).find("label").innerText).eql("Title");
    await t.expect(await fields.nth(0).find("input").exists).ok("Title input field exists in the form !!!");
    await t.expect(await fields.nth(0).find("input").value).eql("");

    // await t.expect(await fields.nth(1).find("label").exists).ok("Description label exists in the form !!!");
    // await t.expect(await fields.nth(1).find("label").innerText).eql("Description");
    await t.expect(await fields.nth(1).find("textarea").exists).ok("Description text area exists in the form !!!");
    await t.expect(await fields.nth(1).find("textarea").value).eql("");


    const checkbox = await form.child("mat-slide-toggle");

    await t.expect(await checkbox.find("span.mat-slide-toggle-content").exists).ok("Last label exists in the form !!!");
    await t.expect(await checkbox.find("span.mat-slide-toggle-content").innerText).eql("Is ToDo Completed?");
    await t.expect(await checkbox.find("input").exists).ok("Last input exists in the form !!!");
    await t.expect(await checkbox.find("input").checked).notOk("Checkbox initaially set to false");


    const actionButtons = formModal.find("mat-dialog-actions");

    await t.expect(await actionButtons.child(0).exists).ok("First action button exists !!!");
    await t.expect(await actionButtons.child(0).innerText).eql("Submit");


    await t.expect(await actionButtons.child(1).exists).ok("Second action button exists !!!");
    await t.expect(await actionButtons.child(1).innerText).eql("Cancel");

    await t.wait(5000);

    await t.click(await actionButtons.child(1));
    await t.expect(form.exists).notOk("ToDo form disappeared after Cancel is clicked !!!");

    await t.wait(5000);
    await t.click(addButton);


    await t.typeText(fields.nth(0).find("input"), "Finish Jira Story", { speed: 0.2 })
        .wait(1000)
        .typeText(fields.nth(1).find("textarea"), "Finish Jira Story of BOW 22645 by Apr/27/2020", { speed: 0.2 })
        .wait(3000);

    await t.click(checkbox.find("input"));
    await t.expect(checkbox.find("input").checked).ok("Checkbox value set to true");

    await t.wait(3000);

    await t.click(checkbox.find("input"));
    await t.expect(checkbox.find("input").checked).notOk("Checkbox value set back to false");

    await t.click(actionButtons.child(0));

    await t.wait(12000);
    await t.expect(data.length).eql(orgData.length + 1);



    const body = Selector("td-body");

    const list = await body.find("td-list-todo-list");
    const items = await list.find("td-item");
    await t.expect(items.count).eql(data.length);


    await t.expect(items.nth(0).find("mat-card-title").innerText).eql(data[0].title + " - NOT COMPLETED");
    await t.expect(items.nth(0).find("mat-card-content").innerText).eql(data[0].description);
});

test("Should update a single todo item by logged in user", async t => {

    const updateString = ` - ${new Date().toDateString()}`;
    const data = [
        {
            id: 1,
            title: "STARQ24",
            description: "To Finish this task ASAP",
            createdByUserId: 1234,
            updatedByUserId: 0,
            completed: false 
        }
    ];

    const orgData = JSON.parse(JSON.stringify(data));

    const mockAPI = RequestMock()
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/all',
                method: 'POST',
                isAjax: true
            }
        )
        .respond(data, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/user/update',
                method: 'POST',
                isAjax: true
            }
        )
        .respond({}, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/update',
                method: 'PUT',
                isAjax: true
            }
        )
        .respond(async (req, res) => {

            const { id, title, description, completed } = JSON.parse(req.body.toString('utf8'));

            const item = data.filter(itm => itm.id === Number(id))[0];

            item.title = title;
            item.description = description;
            item.completed = completed;

            res.setBody(data);
            res.headers = crossOriginObject;
            res.statusCode = 200;
        });


    await t.addRequestHooks(mockAPI);

    await t.wait(5000);
    const signInButton = Selector("#authButton");
    await signIn(t, signInButton);

    await t.wait(5000);

    const body = Selector("td-body");
    const list = await body.find("td-list-todo-list");
    const items = await list.find("td-item");
    const firstItem = await items.nth(0);
    const actionsElem = await firstItem.find("mat-card-actions");
    const editButton = await actionsElem.find("td-update-todo");

    await t.expect(firstItem.find("mat-card-title").innerText).eql(orgData[0].title + " - NOT COMPLETED");
    await t.expect(firstItem.find("mat-card-content").innerText).eql(orgData[0].description);

    await t.click(editButton);


    //Expect to have modal
    const formModal = Selector("#form-modal");

    await t.expect(formModal.exists).ok("Form Modal exists for edit todo item !!!");
    await t.expect(await formModal.find(".mat-dialog-title").innerText).eql("ToDo Form");

    const form = formModal.find("form");
    await t.expect(form.exists).ok("ToDo form exists for edit todo item !!!");

    const fields = await form.child("mat-form-field");

    // await t.expect(await fields.nth(0).find("label").exists).ok("Title label exists in the form !!!");
    // await t.expect(await fields.nth(0).find("label").innerText).eql("Title");
    await t.expect(await fields.nth(0).find("input").exists).ok("Title input field exists in the form !!!");
    await t.expect(await fields.nth(0).find("input").value).eql(data[0].title);

    // await t.expect(await fields.nth(1).find("label").exists).ok("Description label exists in the form !!!");
    // await t.expect(await fields.nth(1).find("label").innerText).eql("Description");
    await t.expect(await fields.nth(1).find("textarea").exists).ok("Description text area exists in the form !!!");
    await t.expect(await fields.nth(1).find("textarea").value).eql(data[0].description);

    const checkbox = await form.child("mat-slide-toggle");

    await t.expect(await checkbox.find("span.mat-slide-toggle-content").exists).ok("Last label exists in the form !!!");
    await t.expect(await checkbox.find("span.mat-slide-toggle-content").innerText).eql("Is ToDo Completed?");
    await t.expect(await checkbox.find("input").exists).ok("Last input exists in the form !!!");
    await t.expect(await checkbox.find("input").checked).notOk("Checkbox initaially set to false");


    const actionButtons = formModal.find("mat-dialog-actions");

    await t.expect(await actionButtons.child(0).exists).ok("First action button exists !!!");
    await t.expect(await actionButtons.child(0).innerText).eql("Submit");


    await t.expect(await actionButtons.child(1).exists).ok("Second action button exists !!!");
    await t.expect(await actionButtons.child(1).innerText).eql("Cancel");

    await t.wait(5000);

    await t.click(await actionButtons.child(1));
    await t.expect(form.exists).notOk("ToDo form disappeared after Cancel is clicked !!!");

    await t.wait(5000);
    await t.click(editButton);


    await t.typeText(fields.nth(0).find("input"), updateString, { speed: 0.2 })
        .wait(1000)
        .typeText(fields.nth(1).find("textarea"), updateString, { speed: 0.2 })
        .wait(3000);

    await t.click(checkbox.find("input"));
    await t.expect(checkbox.find("input").checked).ok("Checkbox value set to true");

    await t.wait(3000);

    await t.click(actionButtons.child(0));

    await t.wait(12000);

    await t.expect(data.length).eql(orgData.length);
    await t.expect(data[0].title).notEql(orgData[0].title);
    await t.expect(data[0].description).notEql(orgData[0].description);
    await t.expect(data[0].completed).notEql(orgData[0].completed);


    await t.expect(firstItem.find("mat-card-title").innerText).eql(data[0].title + " - COMPLETED");
    await t.expect(firstItem.find("mat-card-content").innerText).eql(data[0].description);

});

test("Should delete a single todo item by logged in user", async t => {
    const data = [
        {
            id: 1,
            title: "STARQ24",
            description: "To Finish this task ASAP",
            createdByUserId: 1234,
            updatedByUserId: 0,
            completed: false 
        }
    ];

    const orgData = JSON.parse(JSON.stringify(data));

    const mockAPI = RequestMock()
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/all',
                method: 'POST',
                isAjax: true
            }
        )
        .respond(data, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/user/update',
                method: 'POST',
                isAjax: true
            }
        )
        .respond({}, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/delete/1',
                method: 'DELETE',
                isAjax: true
            }
        )
        .respond(async (req, res) => {
            const {path} = req;
            let id = path.substr(path.lastIndexOf("/") + 1);
            
            data.splice(0, 1);
            
            res.setBody(data);
            res.headers = crossOriginObject;
            res.statusCode = 200;
        });


    await t.addRequestHooks(mockAPI);

    await t.wait(5000);
    const signInButton = Selector("#authButton");
    await signIn(t, signInButton);

    await t.wait(5000);

    
    const body = Selector("td-body");
    const list = await body.find("td-list-todo-list");
    const items = await list.find("td-item");

    await t.expect(items.count).eql(1);

    const firstItem = await items.nth(0);
    const actionsElem = await firstItem.find("mat-card-actions");

    await t.expect(actionsElem.exists).ok("Action options exists !!!");

    const otherActions = await actionsElem.find("button[mat-icon-button]");

    await t.click(otherActions);
    const menu = await Selector("div.mat-menu-content");


    await t.wait(3000);
    await t.click(menu.child(0).find('button'));

     //Expect to have confirm modal
     const confirmModal = Selector("#confirm-modal");

     await t.expect(confirmModal.exists).ok("Confirm Modal exists for deleting todo item !!!");
     await t.expect(await confirmModal.find("h1.mat-dialog-title").innerText).eql("Confirm Action");
     await t.expect(await confirmModal.find("div.mat-dialog-content").innerText).eql("Are you sure you want to delete this item?.");
 

     const actionButtons = confirmModal.find("mat-dialog-actions");

     await t.expect(await actionButtons.child(0).exists).ok("Second action button exists !!!");
     await t.expect(await actionButtons.child(0).innerText).eql("Cancel");


     await t.expect(await actionButtons.child(1).exists).ok("First action button exists !!!");
     await t.expect(await actionButtons.child(1).innerText).eql("Delete");
 
 
     await t.wait(5000);
     
     await t.click(actionButtons.child(0));
     
     await t.wait(3000);

     await t.click(otherActions);
     await t.wait(1000);
     await t.click(menu.child(0).find('button'));

     
     await t.wait(3000);
     await t.click(actionButtons.child(1));
     
     await t.wait(10000);
     
     await t.expect(orgData.length - 1).eql(data.length);
     await t.expect(data).eql([]);

     await t.expect(items.count).eql(0);
});


test("Should MARK DONE a single todo item by logged in user", async t => {
    
    const data = [
        {
            id: 1,
            title: "STARQ24",
            description: "To Finish this task ASAP",
            createdByUserId: 1234,
            updatedByUserId: 0,
            completed: false 
        }
    ];

    const orgData = JSON.parse(JSON.stringify(data));

    const mockAPI = RequestMock()
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/all',
                method: 'POST',
                isAjax: true
            }
        )
        .respond(data, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/user/update',
                method: 'POST',
                isAjax: true
            }
        )
        .respond({}, 200, crossOriginObject)
        .onRequestTo(
            {
                url: 'http://localhost:8383/todo/update',
                method: 'PUT',
                isAjax: true
            }
        )
        .respond(async (req, res) => {
            const { id, title, description, completed } = JSON.parse(req.body.toString('utf8'));

            const item = data.filter(itm => itm.id === Number(id))[0];

            item.title = title;
            item.description = description;
            item.completed = completed;

            res.setBody(data);
            res.headers = crossOriginObject;
            res.statusCode = 200;
        });


    await t.addRequestHooks(mockAPI);

    await t.wait(5000);
    const signInButton = Selector("#authButton");
    await signIn(t, signInButton);

    await t.wait(5000);

    
    const body = Selector("td-body");
    const list = await body.find("td-list-todo-list");
    const items = await list.find("td-item");

    await t.expect(items.count).eql(1);

    const firstItem = await items.nth(0);
    const actionsElem = await firstItem.find("mat-card-actions");


    const otherActions = await actionsElem.find("button[mat-icon-button]");


    await t.click(otherActions);
    const menu = await Selector("div.mat-menu-content");


    await t.wait(3000);
    await t.click(menu.child(1).find('button'));

     //Expect to have confirm modal
     const confirmModal = Selector("#confirm-modal");

     await t.expect(confirmModal.exists).ok("Confirm Modal exists for mark todo item AS DONE !!!");
     await t.expect(await confirmModal.find("h1.mat-dialog-title").innerText).eql("Confirm Action");
     await t.expect(await confirmModal.find("div.mat-dialog-content").innerText).eql("Are you sure you want to mark this item as DONE?.");
 

     const actionButtons = confirmModal.find("mat-dialog-actions");

     await t.expect(await actionButtons.child(0).exists).ok("Second action button exists !!!");
     await t.expect(await actionButtons.child(0).innerText).eql("Cancel");


     await t.expect(await actionButtons.child(1).exists).ok("First action button exists !!!");
     await t.expect(await actionButtons.child(1).innerText).eql("Mark as DONE");
 
 
     await t.wait(5000);
     
     await t.click(actionButtons.child(0));
     
     await t.wait(3000);

     await t.click(otherActions);
     await t.wait(1000);
     await t.click(menu.child(1).find('button'));
     
     await t.wait(3000);
     await t.click(actionButtons.child(1));
     
     await t.wait(10000);
     
     await t.expect(orgData.length).eql(data.length);
     await t.expect(data[0].completed).ok("Todo item is marked as DONE");
     
     //  await t.expect(items.child().count).eql(0);
     
    await t.wait(3000);
    await t.click(otherActions);
    await t.wait(1000);

    await t.expect(menu.child().count).eql(1);
    await t.expect(menu.child(2).exists).notOk("Action option 'MARK DONE' does not exists !!!");
    await t.expect(items.nth(0).find("mat-card-title").innerText).eql(orgData[0].title + " - COMPLETED");
});