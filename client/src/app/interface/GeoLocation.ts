export interface GeoLocation{
    status:string,
    results:[{
        address_components: [
            {long_name:string,short_name:string},
        ]
        geometry:{
            location:{
                lat:string,
                lng:string
            }
        }
    }]
}