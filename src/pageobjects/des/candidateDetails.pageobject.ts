import Page from '../base/page'

class CandidateDetailsPageObject extends Page {
        public checkCandidateTestDetailsCard(data: any) {
            const { type, postTown, ad1, firstName, lastName, trading } = data;
            console.info('Checking candidate details card');
            // clickElement('click', 'selector', this.journeyType);
            // clickElementWithText('click', 'element', type);
    
            // /***
            // * journey start location
            // journey end location 
            // journey goods carried
            // */
    
            // setInputField('set', startLocation, this.journeyStartLocation);
            // setInputField('set', endLocation, this.journeyEndLocation);
            // setInputField('set', goodsCarried, this.journeyGoodsCarried);
        }
       
    }
    

    
}

export default new CandidateDetailsPageObject()
