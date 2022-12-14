import styled from "styled-components";

export const MainMapContainer = styled.div`
width:100%;
height:95vh;
& div.leaflet-control-attribution{
    display:none;
}
& div.leaflet-container{
    width:100%;
    height:100%;
}
`