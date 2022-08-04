const resourceDictionary =
  [
    {
      'Type': 'AWS::S3::AccessPoint',
      'Properties': [

      ]
    },
    {
      'Type': 'AWS::S3::Bucket',
      'Properties': [
        {
          'Name': 'AccelerateConfiguration',
          'Type': 'AccelerateConfiguration'
        },
        {
          'Name': 'AccessControl',
          'Type': 'String'
        },
        {
          'Name': 'AnalyticsConfigurations',
          'Type': 'AnalyticsConfiguration'
        },
        {
          'Name': 'BucketEncryption',
          'Type': 'BucketEncryption'
        },
        {
          'Name': 'BucketName',
          'Type': 'String'
        },
        {
          'Name': 'CorsConfiguration',
          'Type': 'CorsConfiguration'
        },
        {
          'Name': 'IntelligentTieringConfigurations',
          'Type': 'IntelligentTieringConfiguration'
        },
        {
          'Name': 'InventoryConfigurations',
          'Type': 'InventoryConfiguration'
        },
        {
          'Name': 'LifecycleConfiguration',
          'Type': 'LifecycleConfiguration'
        },
        {
          'Name': 'LoggingConfiguration',
          'Type': 'LoggingConfiguration'
        },
        {
          'Name': 'MetricsConfigurations',
          'Type': 'MetricsConfiguration'
        },
        {
          'Name': 'NotificationConfiguration',
          'Type': 'NotificationConfiguration'
        },
        {
          'Name': 'ObjectLockConfiguration',
          'Type': 'ObjectLockConfiguration'
        },
        {
          'Name': 'ObjectLockEnabled',
          'Type': 'Boolean'
        },
        {
          'Name': 'OwnershipControls',
          'Type': 'OwnershipControls'
        },
        {
          'Name': 'PublicAccessBlockConfiguration',
          'Type': 'PublicAccessBlockConfiguration'
        },
        {
          'Name': 'ReplicationConfiguration',
          'Type': 'ReplicationConfiguration'
        },
        {
          'Name': 'Tags',
          'Type': 'Tag'
        },
        {
          'Name': 'VersioningConfiguration',
          'Type': 'VersioningConfiguration'
        },
        {
          'Name': 'WebsiteConfiguration',
          'Type': 'WebsiteConfiguration'
        }
      ]
    },
    {
      'Type': 'AWS::S3::BucketPolicy',
      'Properties': [

      ]
    },
    {
      'Type': 'AWS::S3::MultiRegionAccessPoint',
      'Properties': [

      ]
    },
    {
      'Type': 'AWS::S3::MultiRegionAccessPointPolicy',
      'Properties': [

      ]
    },
    {
      'Type': 'AWS::S3::StorageLens',
      'Properties': [

      ]
    }
  ]
