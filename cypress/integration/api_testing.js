import data from '../fixtures/data.json'
import faker from 'faker'

describe ("Souvenir-Memoir API Testing",()=>{
        if (data.method=="GET"){
            describe ('Testing Existing Data',()=>{
                let id=""
                it('Fetching All Memories and Check Status',()=>{
                    cy.request({
                        method:data.method,
                        url:'/'
                    }).then(res=> {
                        id=res.body[0]._id
                        console.log(id)
                        expect(res.status).to.be.eq(200);
                    })
                })
                it('Like Funcationality testing',()=>{
                    cy.request({
                        method:"PATCH",
                        url:`/${id}/likePost`
                    }).then(res=> {
                        expect(res.body.title).to.be.eq("Chrollo Lucilfer");
                        console.log(res.body)
                    })
                })
                
            });
            }
            else if (data.method=="POST"){
            describe ('Checking CRUD Functionality',()=>{
                let id=""
                it('Creating New Memories',()=>{
                    cy.fixture('data').then(Data =>{
                    cy.request({
                        method:data.method,
                        url:'/',
                        body: Data.payload
                    }).then(res=> {
                        cy.log(JSON.stringify(res.body))
                        id=res.body._id;
                        expect(res.body.title).to.be.eq(Data.payload.title);
                        expect(res.body).to.have.property('creator')
                    })
                })
                })
                it('Assertion, The newly added id is present in data',()=>{
                    cy.request({
                        method:"GET",
                        url:'/',
                        timeout: 120000
                    }).then(res=> {
                        let arr= res.body;
                        let userId=arr[arr.length - 1]._id;
                        expect(userId).to.be.eq(id)
                    })
                })
                it('Like the created memory',()=>{
                    cy.request({
                        method:"PATCH",
                        url:`/${id}/likePost`
                    }).then(res=> {
                        expect(res.body.likeCount).to.be.eq(1)
                    })
                })
                it('Update the created memory',()=>{
                    cy.request({
                        method:"PATCH",
                        url:`/${id}`,
                        body: data.editedPayload
                    }).then(res=> {
                        expect(res.body.title).to.be.eq(data.editedPayload.title);
                        console.log(res.body)
                    })
                })
                it('Delete the memory',()=>{
                    cy.request({
                        method:"DELETE",
                        url:`/${id}`
                    }).then(res=> {
                        expect(res.body.message).to.be.eq("Post Deleted Successfully")
                        console.log(res.body)
                    })
                })
            
            });
            
            }
    })


