import React from 'react'

const Bookings = () => {
  return (
    <section className="bookings">
          <div className="container mt-5">
        <h1 className="mb-3">Past</h1>
        <h5 className="text-muted mb-4">Aug 15 - Aug 19</h5>
        {/* First Trip Card with Map */}
        <div className="card mb-4 shadow-sm">
          <div className="row g-0">
            <div className="col-md-4">
              <img src="https://maps.googleapis.com/maps/api/staticmap?size=540x200&markers=%7Cicon%3Ahttps%3A%2F%2Fd1a3f4spazzrp4.cloudfront.net%2Freceipt-new%2Forigin%402x.png%7Cscale%3A2%7C6.94398%2C79.86293&markers=%7Cicon%3Ahttps%3A%2F%2Fd1a3f4spazzrp4.cloudfront.net%2Freceipt-new%2Fdestination%402x.png%7Cscale%3A2%7C6.82598%2C79.86521&path=color%3A0x000000FF%7Cweight%3A4%7Cenc%3A%7Bfki%40ifmfNJq%40jAhGbDkApAdBxLhb%40n%40xH%7EDhBpJzXxDd%5BxJQ%60A%7DFtAOfL%7CHKtOt%40v%40tNqDvImGn%7DAg_%40%5Eq%40wAgI%7EzAg%5DfDaBzOoB%7COiFbb%40eI%7E_%40cKjAbAbC%7EJv%5DeIl%60%40sD%7E%7DAcTdt%40_Bta%40%7BFbk%40%5CtHy%40hW_Hz%40lKi%40dFzAtDvB%5D&style=feature%3Aadministrative.locality%7Celement%3Alabels.text%7Ccolor%3A0x556275&style=feature%3Aadministrative.locality%7Celement%3Alabels.text.stroke%7Ccolor%3A0xe9edf3&style=feature%3Aadministrative.neighborhood%7Celement%3Alabels.text.fill%7Ccolor%3A0x90a8dd&style=feature%3Alandscape%7Celement%3Ageometry.fill%7Ccolor%3A0xe6e9ec&style=feature%3Alandscape.man_made%7Celement%3Ageometry.fill%7Ccolor%3A0xe6e9ec&style=feature%3Alandscape.man_made%7Celement%3Ageometry.stroke%7Ccolor%3A0xe6e9ec&style=feature%3Alandscape.natural.terrain%7Ccolor%3A0xe6e9ec%7Cvisibility%3Aoff&style=feature%3Apoi%7Celement%3Ageometry.fill%7Ccolor%3A0xe6e9ec&style=feature%3Apoi%7Celement%3Alabels.icon%7Csaturation%3A-100.0&style=feature%3Apoi%7Celement%3Alabels.text.fill%7Ccolor%3A0x6890df%7Csaturation%3A-65.0%7Clightness%3A-20.0&style=feature%3Apoi.park%7Celement%3Ageometry.fill%7Ccolor%3A0xa7dfb6&style=feature%3Apoi.park%7Celement%3Alabels.text.fill%7Ccolor%3A0x5ea678%7Csaturation%3A-25.0&style=feature%3Aroad%7Celement%3Alabels.icon%7Csaturation%3A-30.0%7Clightness%3A10.0&style=feature%3Aroad%7Celement%3Alabels.text.fill%7Ccolor%3A0x40484d&style=feature%3Aroad.arterial%7Celement%3Ageometry.fill%7Ccolor%3A0xffffff&style=feature%3Aroad.arterial%7Celement%3Ageometry.stroke%7Ccolor%3A0xffffff&style=feature%3Aroad.highway%7Celement%3Ageometry.fill%7Ccolor%3A0xa6b5db&style=feature%3Aroad.highway%7Celement%3Ageometry.stroke%7Ccolor%3A0x96acd0&style=feature%3Aroad.highway.controlled_access%7Celement%3Ageometry.fill%7Ccolor%3A0x8b9fd4&style=feature%3Aroad.highway.controlled_access%7Celement%3Ageometry.stroke%7Ccolor%3A0x7996c9&style=feature%3Aroad.local%7Celement%3Ageometry.fill%7Ccolor%3A0xffffff&style=feature%3Aroad.local%7Celement%3Ageometry.stroke%7Ccolor%3A0xffffff&style=feature%3Atransit%7Celement%3Alabels.icon%7Csaturation%3A-65.0&style=feature%3Atransit.line%7Celement%3Ageometry.fill%7Ccolor%3A0x29b4e3%7Csaturation%3A-60.0%7Clightness%3A60.0&style=feature%3Atransit.line%7Celement%3Ageometry.stroke%7Ccolor%3A0x29b4e3%7Csaturation%3A-60.0%7Clightness%3A60.0&style=feature%3Atransit.station.airport%7Celement%3Ageometry.fill%7Ccolor%3A0xc9d4e3&style=feature%3Atransit.station.rail%7Celement%3Alabels.text%7Csaturation%3A-40.0%7Clightness%3A5.0&style=feature%3Awater%7Celement%3Ageometry.fill%7Ccolor%3A0xacd5f5&experience=2ee26910-4688-41ce-a048-80b1816c5b7b&key=AIzaSyDU50VAD4HVefGeUpMlFxuCbsCvMrPzwZA&signature=_QmCTsbOCbqICCnYarZ1DYmIYcc=" className="img-fluid rounded-start" alt="Map" />
            </div>
            <div className="col-md-8 d-flex align-items-center">
              <div className="card-body">
                <h5 className="card-title">Paul's Pl</h5>
                <p className="card-text">Aug 19 • 6:54 PM</p>
                <p className="card-text"><b>LKR1,509.81</b></p>
                <div className="d-flex">
                  <button className="btn btn-outline-secondary me-2">
                    <i className="bx bx-support" /> Help
                  </button>
                  <button className="btn btn-outline-secondary me-2">
                    <i className="bx bx-detail" /> Details
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="bx bx-revision" /> Rebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Other Trip Cards */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img src="https://atlas-content-cdn.pixelsquid.com/stock-images/delivery-robot-robotics-B5mRVn3-600.jpg" className="img-fluid rounded-start" alt="TukTuk" />
                </div>
                <div className="col-md-8 d-flex align-items-center">
                  <div className="card-body">
                    <h5 className="card-title">FLIXOO Studios</h5>
                    <p className="card-text">Aug 18 • 9:24 PM</p>
                    <p className="card-text"><b>LKR508.70</b></p>
                    <div className="d-flex">
                      <button className="btn btn-outline-secondary me-2">
                        <i className="bx bx-support" /> Help
                      </button>
                      <button className="btn btn-outline-secondary me-2">
                        <i className="bx bx-detail" /> Details
                      </button>
                      <button className="btn btn-outline-secondary">
                        <i className="bx bx-revision" /> Rebook
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* More cards similar to the above structure */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img src="https://atlas-content-cdn.pixelsquid.com/stock-images/delivery-robot-robotics-B5mRVn3-600.jpg" className="img-fluid rounded-start" alt="TukTuk" />
                </div>
                <div className="col-md-8 d-flex align-items-center">
                  <div className="card-body">
                    <h5 className="card-title">FLIXOO Studios</h5>
                    <p className="card-text">Aug 18 • 9:24 PM</p>
                    <p className="card-text"><b>LKR508.70</b></p>
                    <div className="d-flex">
                      <button className="btn btn-outline-secondary me-2">
                        <i className="bx bx-support" /> Help
                      </button>
                      <button className="btn btn-outline-secondary me-2">
                        <i className="bx bx-detail" /> Details
                      </button>
                      <button className="btn btn-outline-secondary">
                        <i className="bx bx-revision" /> Rebook
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Bookings