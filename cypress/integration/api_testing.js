import data from '../fixtures/data.json'

if (data.method=="GET"){
describe ('Souvenior-Memoir-API-Testing',()=>{
    let id=""
    it('GET All Memories',()=>{
        cy.request({
            method:data.method,
            url:'/'
        }).then(res=> {
            id=res.body[0]._id
            console.log(id)
        })
    })
    it('Like first memory',()=>{
        cy.request({
            method:"PATCH",
            url:`/${id}/likePost`
        }).then(res=> {
            console.log(res.body)
        })
    })
    
});
}
else if (data.method=="POST"){
describe ('Creating a post',()=>{
    let id=""
    it('Posting',()=>{
        cy.request({
            method:data.method,
            url:'/',
            body: data.payload
        }).then(res=> {
            id=res.body._id;
            expect(res.body.title).to.be.eq(data.payload.title);
           // expect(res.body).to.include(data.payload)
        })
    })
    it('Assertion, The newly added id is present in data',()=>{
        cy.request({
            method:"GET",
            url:'/'
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
    it.skip('Delete the memory',()=>{
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
