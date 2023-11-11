export type decentralisedElection = {
  "version": "0.1.0",
  "name": "decentralised_election",
  "constants": [
    {
      "name": "ACCOUNT_SEED",
      "type": "bytes",
      "value": "[97, 99, 99, 111, 117, 110, 116]"
    },
    {
      "name": "ELECTION_SEED",
      "type": "bytes",
      "value": "[101, 108, 101, 99, 116, 105, 111, 110]"
    },
    {
      "name": "VOTE_SEED",
      "type": "bytes",
      "value": "[118, 111, 116, 101]"
    }
  ],
  "instructions": [
    {
      "name": "newAccount",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "newElection",
      "accounts": [
        {
          "name": "electionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "addCandidate",
      "accounts": [
        {
          "name": "electionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeStatusOfElection",
      "accounts": [
        {
          "name": "electionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "status",
          "type": "u8"
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "voteAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "electionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "index",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userAccountPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "electionCount",
            "type": "u8"
          },
          {
            "name": "signer",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "electionPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "totalVotes",
            "type": "u16"
          },
          {
            "name": "candidates",
            "type": {
              "vec": {
                "defined": "Candidate"
              }
            }
          },
          {
            "name": "electionStatus",
            "type": "u8"
          },
          {
            "name": "signer",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "votePda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "election",
            "type": "publicKey"
          },
          {
            "name": "signer",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Candidate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "votes",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidCandidate",
      "msg": "Invalid candidate index"
    }
  ],
  "metadata": {
    "address": "2kFhxSYB7cvVCmvJ7cM91MGkHLMpLcJtov5AKkrczZ4X"
  }
}

export const IDL = {
  "version": "0.1.0",
  "name": "decentralised_election",
  "constants": [
    {
      "name": "ACCOUNT_SEED",
      "type": "bytes",
      "value": "[97, 99, 99, 111, 117, 110, 116]"
    },
    {
      "name": "ELECTION_SEED",
      "type": "bytes",
      "value": "[101, 108, 101, 99, 116, 105, 111, 110]"
    },
    {
      "name": "VOTE_SEED",
      "type": "bytes",
      "value": "[118, 111, 116, 101]"
    }
  ],
  "instructions": [
    {
      "name": "newAccount",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "newElection",
      "accounts": [
        {
          "name": "electionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "addCandidate",
      "accounts": [
        {
          "name": "electionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeStatusOfElection",
      "accounts": [
        {
          "name": "electionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "status",
          "type": "u8"
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "voteAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "electionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "index",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "UserAccountPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "electionCount",
            "type": "u8"
          },
          {
            "name": "signer",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "ElectionPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "totalVotes",
            "type": "u16"
          },
          {
            "name": "candidates",
            "type": {
              "vec": {
                "defined": "Candidate"
              }
            }
          },
          {
            "name": "electionStatus",
            "type": "u8"
          },
          {
            "name": "signer",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "VotePda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "election",
            "type": "publicKey"
          },
          {
            "name": "signer",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Candidate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "votes",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidCandidate",
      "msg": "Invalid candidate index"
    }
  ],
  "metadata": {
    "address": "CkYxHzac22xoYRMm6tgoebgkBmhhV2W7g9SwkkPsTkkH"
  }
}
