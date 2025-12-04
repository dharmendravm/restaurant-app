import Table from '../models/table.js'

//Pending . . . 


export const registerTable = async (req, res) => {
    try {
    const {tableNumber, sittingCapacity} = req.body;
        
    // qr-Slug
    const qrSlug = crypto.getRandomValues(6).toString('hex')
    console.log(qrSlug);

    // qr Code Url
        const qrCodeUrl = (`http://localhost:5173/scanqr/${qrSlug}`)
    
    } catch (error) {
        
    }

}
