const ServiceList = [
  {
    Service: {
      name: 'viewAllObjects',
      fullUrl:
        'http://localhost:5002//api/v1/RatingSystem/objects/viewAllObjects'
    }
  },
  {
    Service: {
      name: 'createObject',
      fullUrl: 'http://localhost:5002//api/v1/RatingSystem/objects/CreateObject'
    }
  },
  {
    Service: {
      name: 'viewOneObject',
      fullUrl: 'http://localhost:5002//api/v1/RatingSystem/objects/view'
    }
  },
  {
    Service: {
      name: 'CreateObjectInstance',
      fullUrl:
        'http://localhost:5002//api/v1/RatingSystem/instances/CreateObjectInstance'
    }
  },
  {
    Service: {
      name: 'ObjectInstanceDetailsInquiry',
      fullUrl:
        'http://localhost:5002//api/v1/RatingSystem/instances/ObjectInstanceDetailsInquiry'
    }
  },
  {
    Service: {
      name: 'ObjectInstanceListInquiry',
      fullUrl:
        'http://localhost:5002//api/v1/RatingSystem/instances/ObjectInstanceListInquiry'
    }
  },
  {
    Service: {
      name: 'InstanceUserRatingListInquiry',
      fullUrl:
        'http://localhost:5002//api/v1/RatingSystem/instances/InstanceUserRatingListInquiry'
    }
  },
  {
    Service: {
      name: 'RateInstance',
      fullUrl: 'http://localhost:5002//api/v1/RatingSystem/ratings/RateInstance'
    }
  }
]

module.exports = { ServiceList }
