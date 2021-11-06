export interface GeoLocation{
    status:string,
    results:[{
        geometry:{
            location:{
                lat:string,
                lng:string
            }
        }
    }]
}