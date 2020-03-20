export default `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part>
    <measure>
      <attributes>
        <divisions>4</divisions>
        <key>
          <fifths>0</fifths>
        </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
        </time>
      </attributes>
      <note>
        <rest/>
        <duration>16</duration>
      </note>
    </measure>

    <%_ measures.forEach(function(measure) { _%>
    <measure>
      <%_ measure.notes.forEach(function(note) { _%>
      <note>
        <%_ if (note.isRest) { _%>
        <rest />
        <%_ } else { _%>
        <pitch>
          <step><%= note.pitch.step %></step>
          <octave><%= note.pitch.octave %></octave>
        </pitch>
        <lyric>
          <text><%= note.lyric.text %></text>
        </lyric>
        <%_ } _%>
        <duration><%= note.duration %></duration>
      </note>
      <%_ }) _%>
    </measure>
    <%_ }) _%>

    <measure>
      <note>
        <rest/>
        <duration>16</duration>
      </note>
    </measure>
  </part>
</score-partwise>
`;
