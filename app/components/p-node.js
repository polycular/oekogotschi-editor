import Ember from 'ember'

export default Ember.Component.extend({
  classNames: ['timeline-row post-full'],
  classNameBindings: ['hasControls', 'collapsed'],
  hasControls: false,
  showComponents: false,
  opened: false,
  collapsed: Ember.computed('opened', function(){
    return !this.get('opened')
  }),

  componentList: [
    {
      type: 'waypoint',
      name: 'Waypoint',
      icon: 'icon-location4',
      template: {
        "components": [
          {
            "type": "location",
            "defaults": {
              "groupId": "a0b5927d-6b12-453d-955c-c8ac13f60591",
              "latitude": 47.60991,
              "longitude": 13.782722,
              "radius": 50
            }
          },
          {
            "type": "waypoint",
            "defaults": {
              "groupId": "a0b5927d-6b12-453d-955c-c8ac13f60591",
              "points": 100,
              "timer": 0
            }
          },
          {
            "type": "location-helper",
            "defaults": {
              "groupId": "a0b5927d-6b12-453d-955c-c8ac13f60591",
              "turnOnByDefault": true,
              "penalty": 0,
              "showTrack": false
            }
          }
        ]
      }
    },
    {
      type: 'riddle-cache',
      name: 'Riddle Cache',
      icon: 'icon-location4',
      template: {
        "components": [
          {
            "type": "location",
            "defaults": {
              "groupId": "a0b5927d-6b12-453d-955c-c8ac13f60591",
              "latitude": 47.60991,
              "longitude": 13.782722,
              "radius": 50
            }
          },
          {
            "type": "location-riddle",
            "defaults": {
              "groupId": "a0b5927d-6b12-453d-955c-c8ac13f60591",
              "penalty": 20,
              "points": 100,
              "timer": 0
            }
          },
          {
            "type": "location-helper",
            "defaults": {
              "groupId": "a0b5927d-6b12-453d-955c-c8ac13f60591",
              "turnOnByDefault": false,
              "penalty": 40,
              "showTrack": false
            }
          }
        ]
      }
    },
    {
      type: 'intro',
      name: 'Intro',
      icon: 'fa fa-star-o'
    },
    {
      type: 'tutorial',
      name: 'Tutorial',
      icon: 'fa fa-flag-o'
    },
    {
      type: 'character-speechbubble',
      name: 'Speechbubble',
      icon: 'icon-bubble8'
    },
    {
      type: 'multiquiz',
      name: 'Quiz',
      icon: 'fa fa-check-square-o'
    },
    {
      type: 'action',
      name: 'Action',
      icon: 'fa fa-flash'
    },
    {
      type: 'game',
      name: 'Game',
      icon: 'fa fa-gamepad'
    },
    {
      type: 'multimedia',
      name: 'Multimedia',
      icon: 'fa fa-video-camera'
    }
  ],

  mouseEnter() {
    this.set('hasControls', true)
  },

  mouseLeave() {
    this.set('hasControls', false)
  },

  actions: {
    addComponent(type, template) {
      this.sendAction('addComponent', type, template)
    },

    toggleCollapse(node) {
      this.get('setCollapsedNode')(node)
    },

    remove(id) {
      this.sendAction('remove', id)
    },

    moveUp() {
      this.sendAction('moveUp')
    },

    moveDown() {
      this.sendAction('moveDown')
    },

    cancel(){
      let node = this.get('data.content') ? this.get('data.content') : this.get('data')
      node.rollbackAttributes()
      this.get('data.components').forEach(component => {
        component.rollbackAttributes()
        component.reload()
      })
      this.toggleProperty('opened')
    },

    save(){
      this.sendAction('save')
    }
  }
})
