> JSON - array
> 
> > [scene - any] - object
> >
> > `A scene. These are usually the separators that create multiple files.`
> >
> > > "id" - string
> > >
> > > `The ID of said scene. This should not be seen upfront by the end user. Instead, use "scene" for the scene name.`
> >
> > > "scene" - string
> > >
> > > `The name of this scene.`
> >
> > > "appearing_characters" - array
> > >
> > > `The characters inside of this scene. This will be used as a translation table for name IDs, and the names can be used as an introduction table at the start of your file.`
> > >
> > > > [character_details - any] - array
> > > >
> > > > > [id - 0] - string
> > > >
> > > > > [name - 1] - string
> >
> > > "content" - array
> > >
> > > `The text of this scene. Split into paragraphs.`
> > >
> > > > [text - any] - object
> > > >
> > > > `An individual paragraph of text, told by one character. It can contain multiple sentences.`
> > > >
> > > > > "type": "text"
> > > >
> > > > > "content" - array
> > > > >
> > > > > `An array of the paragraph's sentences.`
> > > > >
> > > > > > [text - any] - string
> > > >
> > > > > "person" - string
> > > > >
> > > > > `The paragraph's speaker. This usually is the reason paragraphs are split.`
> > > 
> > > > [break - any] - object
> > > >
> > > > `A break of passage.`
> > > >
> > > > > "type": "break"
> > > >
> > > > > "content" - string
> > > > >
> > > > > `The breakage's message.`
> >
> > > "created" - string
> > > 
> > > `When this scene was created. Optional.`
